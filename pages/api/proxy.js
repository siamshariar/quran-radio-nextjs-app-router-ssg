import http from 'http';
import https from 'https';

// Only these known live-radio stream hosts may be proxied (see data/liveRadios.js).
// This is not a general-purpose proxy — it exists solely to avoid mixed-content
// blocking for a couple of plain-http:// streams on an https:// site.
const ALLOWED_HOSTS = ['www.quran-radio.org', '5.135.194.225'];

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL parameter' });
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol) || !ALLOWED_HOSTS.includes(parsedUrl.hostname)) {
    return res.status(403).json({ error: 'URL host is not allowed' });
  }

  // Determine whether to use HTTP or HTTPS
  const client = parsedUrl.protocol === 'https:' ? https : http;

  // Forward the request to the external URL
  const proxyReq = client.request(url, (proxyRes) => {
    // Set the headers and status code from the external response
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    // Pipe the response data back to the client
    proxyRes.pipe(res);

    // A live stream can drop mid-flight; don't let a dead upstream hang the response open.
    proxyRes.on('error', () => {
      if (!res.writableEnded) res.end();
    });
  });

  proxyReq.on('error', (error) => {
    console.error('Error proxying request:', error);
    // Headers may already be flushed if the stream was mid-pipe when the upstream reset —
    // trying to send a fresh status/body at that point throws ERR_HTTP_HEADERS_SENT.
    if (res.headersSent) {
      if (!res.writableEnded) res.end();
    } else {
      res.status(500).send('Internal Server Error');
    }
  });

  // If the client disconnects (e.g. player switches track), stop pulling from upstream
  // instead of leaving the proxy request dangling.
  res.on('close', () => {
    proxyReq.destroy();
  });

  // Forward the body of the request (if any)
  if (req.method !== 'GET') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
}

// This route streams a live-radio response indefinitely instead of resolving quickly,
// which is exactly what triggers Next's "API resolved without sending a response" warning.
// externalResolver tells Next the response lifecycle is handled outside its normal tracking.
export const config = {
  api: {
    externalResolver: true,
  },
};