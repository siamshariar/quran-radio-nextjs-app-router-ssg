"use client";

import { Suspense, useEffect } from "react";
import { setupIonicReact } from "@ionic/react";
import { usePathname, useSearchParams } from "next/navigation";
import * as gtag from "@/lib/gtag";
import { initializeAudioStore } from "@/store/audio";
import Player from "@/components/player";
import {
	setFavorites,
	setIsTab,
	setLiveFavorites,
	setLiveRecent,
	setRecent,
	setSettings,
} from "@/store/local";

function GaPageviewTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const qs = searchParams.toString();
		gtag.pageview(qs ? `${pathname}?${qs}` : pathname);
	}, [pathname, searchParams]);

	return null;
}

export default function Providers({ children }) {
	setupIonicReact();

	useEffect(() => {
		initializeAudioStore();
	}, []);

	// detect Tab
	useEffect(() => {
		if (typeof window !== "undefined") {
			const x = window.matchMedia("(max-width: 768px)");
			if (x.matches) {
				setIsTab(true);

				// DISABLED RIGHT CLICK/TAP ON MOBILE
				window.addEventListener('contextmenu', function (e) {
					e.preventDefault();
				}, false);
				// DISABLED RIGHT CLICK/TAP ON MOBILE
			} else {
				setIsTab(false);
			}
			x.onchange = () => {
				if (x.matches) {
					setIsTab(true);

					// DISABLED RIGHT CLICK/TAP ON MOBILE
					window.addEventListener('contextmenu', function (e) {
						e.preventDefault();
					}, false);
					// DISABLED RIGHT CLICK/TAP ON MOBILE
				} else {
					setIsTab(false);
				}
			};
		}
	}, []);

	// load from local storage to global state
	useEffect(() => {
		const localSettings = localStorage.getItem("settings");
		const localFavorites = localStorage.getItem("favorites");
		const localLiveFavorites = localStorage.getItem("liveFavorites");
		const localRecents = localStorage.getItem("recent");
		const localLiveRecents = localStorage.getItem("liveRecent");
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
		if (localLiveRecents) {
			setLiveRecent(JSON.parse(localLiveRecents));
		}
	}, []);

	return (
		<>
			<Suspense fallback={null}>
				<GaPageviewTracker />
			</Suspense>
			<Player />
			{children}
		</>
	);
}
