import { server } from "@/lib/config";
import { reciters } from "@/data/reciters";

// Static, build-time only (no headers()/searchParams) so this stays
// compatible with the Capacitor static export build alongside the normal
// Vercel deploy — see isStaticExport handling in lib/metadata.js for why
// per-request data can't be used here.
//
// /favorites and /recent are excluded: they render the same generic shell
// for every visitor (content comes from localStorage), so they have no
// unique indexable content.
export default function sitemap() {
	const staticRoutes = [
		"",
		"/about",
		"/chapters",
		"/live-radio",
		"/privacy-policy",
		"/reciters",
		"/support",
	].map((path) => ({
		url: `${server}${path}`,
		changeFrequency: "weekly",
		priority: path === "" ? 1 : 0.8,
	}));

	const reciterRoutes = reciters.map((reciter) => ({
		url: `${server}/reciters/${encodeURI(String(reciter.id))}`,
		changeFrequency: "monthly",
		priority: 0.6,
	}));

	return [...staticRoutes, ...reciterRoutes];
}
