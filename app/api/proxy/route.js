// Only these known live-radio stream hosts may be proxied (see data/liveRadios.js).
// This is not a general-purpose proxy — it exists solely to avoid mixed-content
// blocking for a couple of plain-http:// streams on an https:// site.
const ALLOWED_HOSTS = ["www.quran-radio.org", "5.135.194.225"];

async function proxy(request) {
	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");

	if (!url) {
		return Response.json({ error: "Missing URL parameter" }, { status: 400 });
	}

	let parsedUrl;
	try {
		parsedUrl = new URL(url);
	} catch {
		return Response.json({ error: "Invalid URL parameter" }, { status: 400 });
	}

	if (!["http:", "https:"].includes(parsedUrl.protocol) || !ALLOWED_HOSTS.includes(parsedUrl.hostname)) {
		return Response.json({ error: "URL host is not allowed" }, { status: 403 });
	}

	try {
		const upstream = await fetch(url, {
			method: request.method,
			body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
			duplex: request.method !== "GET" && request.method !== "HEAD" ? "half" : undefined,
			signal: request.signal,
		});

		return new Response(upstream.body, {
			status: upstream.status,
			headers: upstream.headers,
		});
	} catch (error) {
		console.error("Error proxying request:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export const GET = proxy;
export const POST = proxy;
