import { GA_TRACKING_ID } from "@/lib/gtag";
import Providers from "./providers";

// Core CSS required for Ionic components to work properly
import "@ionic/core/css/core.css";

// Basic CSS for apps built with Ionic
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/typography.css";

// Optional CSS utils that can be commented out
import "tailwindcss/tailwind.css";
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";

// custom css
import "@/styles/global.scss";

export const metadata = {
	title: "Quran.radio",
	// Relative paths — browsers resolve these against whatever origin actually
	// served the page, so favicon/manifest work correctly on localhost, any
	// Vercel preview/staging deployment, and the real production domain alike
	// without needing to guess which one we're on.
	manifest: "/manifest.webmanifest",
	applicationName: "Quran.radio",
	icons: {
		icon: [
			{ url: "/img/id/favicon.png", sizes: "16x16", type: "image/png" },
			{ url: "/img/id/favicon.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/img/app/Quran_Radio_App_Logo_384.jpg" },
			{ url: "/img/app/Quran_Radio_App_Logo_192.jpg", sizes: "76x76" },
			{ url: "/img/app/Quran_Radio_App_Logo_192.jpg", sizes: "120x120" },
			{ url: "/img/app/Quran_Radio_App_Logo_192.jpg", sizes: "152x152" },
			{ url: "/img/app/Quran_Radio_App_Logo_192.jpg", sizes: "180x180" },
		],
		shortcut: "/img/id/favicon.png",
	},
	appleWebApp: {
		title: "Quran.radio",
		capable: true,
	},
};

export const viewport = "width=device-width, initial-scale=1, viewport-fit=cover";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				{/* Global Site Tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                          page_path: window.location.pathname,
                        });
                      `,
					}}
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
