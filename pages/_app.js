import Head from "next/head";

// This Pages Router shell now only serves next-pwa's offline fallback route
// (pages/_offline.js) — every real route moved to the App Router (app/).
// Core CSS required for Ionic components to work properly
import "@ionic/core/css/core.css";
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/typography.css";
import "tailwindcss/tailwind.css";
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";

// custom css
import "@/styles/global.scss";

import { setupIonicReact } from "@ionic/react";

function MyApp({ Component, pageProps }) {
	setupIonicReact();

	return (
		<>
			<Head>
				<title>Quran.radio</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<link rel="icon" href="/img/id/favicon.png" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
