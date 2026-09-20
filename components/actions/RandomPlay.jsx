"use client";

import { useEffect, useState } from "react";
import { refreshOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { PlayerStore, setReciter, setChapterList, setChapter, setLiveRadio, setPlaying } from "@/store";
import { LocalStore } from "@/store/local";
import { liveRadios } from "@/data/liveRadios";
import styles from "./RandomPlay.module.css";

const RANDOM_PLAY_GUIDE_STORAGE_KEY = "randomPlayGuideShown";

const GUIDE_VISIBLE_MS = 4500;

const RandomPlay = ({ classes = {} }) => {
	const reciters = PlayerStore.useState((s) => s.reciters);
	const liveIndex = PlayerStore.useState((s) => s.liveIndex);
	const promoModalsOpen = PlayerStore.useState((s) => s.promoModalsOpen);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const [showGuide, setShowGuide] = useState(false);

	const dismissGuide = () => {
		setShowGuide(false);
		localStorage.setItem(RANDOM_PLAY_GUIDE_STORAGE_KEY, "shown");
	};

	// Wait until every onboarding/promo modal has closed before showing the
	// guide, so it doesn't appear stacked behind (or get dismissed by) one of
	// those modals — then auto-hide it after a few seconds.
	useEffect(() => {
		if (promoModalsOpen) return;

		const guideShown = localStorage.getItem(RANDOM_PLAY_GUIDE_STORAGE_KEY) === "shown";
		if (guideShown) return;

		setShowGuide(true);
		const hideTimer = window.setTimeout(dismissGuide, GUIDE_VISIBLE_MS);
		return () => window.clearTimeout(hideTimer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [promoModalsOpen]);

	const playRandom = () => {
		if (showGuide) {
			dismissGuide();
		}

		if (mode === "normal") {
			const randomReciterIndex = Math.floor(Math.random() * reciters.length);
			const randomReciter = reciters[randomReciterIndex];
			const randomReciterId = randomReciter.id;

			const randomChapterList = randomReciter.moshaf[0].surah_list.split(",");
			const randomChapterIndex = Math.floor(
				Math.random() *
					(randomChapterList.length > 100 ? 100 : randomChapterList.length)
			);

			setReciter(randomReciterId);
			setChapterList(randomReciterId);
			setChapter(randomChapterList, randomChapterIndex);
		} else {
			let randomLiveIndex = Math.floor(Math.random() * liveRadios.length);
			if (liveRadios.length > 1 && randomLiveIndex === liveIndex) {
				randomLiveIndex = (randomLiveIndex + 1) % liveRadios.length;
			}
			setLiveRadio(randomLiveIndex);
		}

		setPlaying(true);
	};

	return (
		<div className={`${classes.root} ${styles.root}`}>
			{showGuide && (
				<div className={styles.tooltip}>
					Click to reload and randomly play a {mode === "normal" ? "surah" : "live radio"}
					<div className={styles.tooltip_arrow}></div>
				</div>
			)}
			<div className={classes.btn} onClick={playRandom}>
				<IonIcon icon={refreshOutline} slot="start" class={classes.icon} />
			</div>
		</div>
	);
};

export default RandomPlay;
