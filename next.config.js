const withPlugins = require('next-compose-plugins');
const withPWA = require("next-pwa");
const withTM = require("next-transpile-modules")([
	"@ionic/react",
	"@ionic/core",
	"@stencil/core",
	"ionicons",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "export",
	reactStrictMode: true,
	basePath: "",
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
	[withTM, withPWA],
	nextConfig,
);
