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
	},
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
