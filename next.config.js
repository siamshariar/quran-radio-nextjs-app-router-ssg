const withPlugins = require('next-compose-plugins');
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Set only for the Capacitor mobile build (`npm run export`) — the API proxy
	// route and ISR revalidation don't exist in a static export, so this must stay
	// off for the normal web deployment.
	...(process.env.NEXT_STATIC_EXPORT === "true" ? { output: "export" } : {}),
	reactStrictMode: true,
	basePath: "",
	// Native replacement for next-transpile-modules (removed): that package
	// predates the App Router and was clobbering Next's built-in CSS loader
	// rule for the app/ compiler pass, breaking the plain-CSS @ionic/core imports.
	transpilePackages: ["@ionic/react", "@ionic/core", "@stencil/core", "ionicons"],
	images: {
		domains: ["images.unsplash.com"],
		unoptimized: true,
	},
	experimental: {
		scrollRestoration: true,
		// Cap static-generation worker parallelism. Next defaults to ~(CPU cores - 1)
		// workers; on a memory-constrained machine that's enough concurrent workers
		// (each holding its own copy of the page bundle) to thrash into swap and get
		// SIGTERM'd mid-build. 2 keeps generation of the ~219 reciter pages stable.
		cpus: 2,
	},
	staticPageGenerationTimeout: 180,
	swcMinify: true,
	pwa: {
		dest: "public",
		disable: process.env.NODE_ENV === 'development',
		register: true,
		// skipWaiting: true,
	},
};

module.exports = withPlugins(
	[withPWA],
	nextConfig,
);
