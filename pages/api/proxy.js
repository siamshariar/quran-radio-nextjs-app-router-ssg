import http from 'http';
import https from 'https';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  const parsedUrl = new URL(url);

  // Determine whether to use HTTP or HTTPS
  const client = parsedUrl.protocol === 'https:' ? https : http;

  // Forward the request to the external URL
  const proxyReq = client.request(url, (proxyRes) => {
    // Set the headers and status code from the external response
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    // Pipe the response data back to the client
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (error) => {
    console.error('Error proxying request:', error);
    res.status(500).send('Internal Server Error');
  });

  // Forward the body of the request (if any)
  if (req.method !== 'GET') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
}