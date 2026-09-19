import { server } from "@/lib/config";

// Static, build-time only — see app/sitemap.js for why (Capacitor static
// export compatibility).
export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${server}/sitemap.xml`,
	};
}
