import React, { useEffect } from "react";
import Head from "next/head";
import * as gtag from "../lib/gtag";

// Core CSS required for Ionic components to work properly
import "@ionic/core/css/core.css";

// Basic CSS for apps built with Ionic
import "@ionic/core/css/normalize.css";
// import "@ionic/core/css/structure.css"; // Remove if nothing is visible
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

import Player from "@/components/player";
import { setupIonicReact } from "@ionic/react";
import NonSSRWrapper from "../components/core/NoSSRWrapper";
import { useRouter } from "next/router";
import {
	LocalStore,
	setFavorites,
	setIsBack,
	setIsTab,
	setLiveFavorites,
	setRecent,
	setSettings,
} from "@/store/local";

function MyApp({ Component, pageProps }) {
	setupIonicReact();

	const isTab = LocalStore.useState((s) => s.isTab);

	// detect Tab
	useEffect(() => {
		if (typeof window !== "undefined") {
			// set isTab depending on screen size
			const x = window.matchMedia("(max-width: 768px)");
			if (x.matches) {
				setIsTab(true);
			} else {
				setIsTab(false);
			}
			x.onchange = () => {
				if (x.matches) {
					setIsTab(true);
				} else {
					setIsTab(false);
				}
			};
		}
	}, []);

	const router = useRouter();

	// Google analytics
	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	// load from local storage to global stat
	useEffect(() => {
		const localSettings = localStorage.getItem("settings");
		const localFavorites = localStorage.getItem("favorites");
		const localLiveFavorites = localStorage.getItem("liveFavorites");
		const localRecents = localStorage.getItem("recent");
		if (localSettings) {
			setSettings(JSON.parse(localSettings));
		}
		if (localFavorites) {
			setFavorites(JSON.parse(localFavorites));
		}
		if (localRecents) {
			setRecent(JSON.parse(localRecents));
		}
		if (localLiveFavorites) {
			setLiveFavorites(JSON.parse(localLiveFavorites));
		}
	}, []);

	return (
		<>
			<NonSSRWrapper>
				<Player />
				<>
					<Head>
						<title>Quran.radio</title>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1, viewport-fit=cover"
						/>
						<link rel="icon" href="/img/id/favicon.png" />
					</Head>
					<Component {...pageProps} isTab={isTab} />
				</>
			</NonSSRWrapper>
		</>
	);
}

export default MyApp;
