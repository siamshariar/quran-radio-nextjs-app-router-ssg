"use client";

import { useEffect, useState } from "react";
import { refreshOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { PlayerStore, setReciter, setChapterList, setChapter, setLiveRadio, setPlaying } from "@/store";
import { LocalStore } from "@/store/local";
import { liveRadios } from "@/data/liveRadios";
import styles from "./RandomPlay.module.css";

const RANDOM_PLAY_GUIDE_STORAGE_KEY = "randomPlayGuideShown";

const RandomPlay = ({ classes = {} }) => {
	const reciters = PlayerStore.useState((s) => s.reciters);
	const liveIndex = PlayerStore.useState((s) => s.liveIndex);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const [showGuide, setShowGuide] = useState(false);

	useEffect(() => {
		const guideShown = localStorage.getItem(RANDOM_PLAY_GUIDE_STORAGE_KEY) === "shown";
		if (!guideShown) {
			setShowGuide(true);
		}
	}, []);

	const dismissGuide = () => {
		setShowGuide(false);
		localStorage.setItem(RANDOM_PLAY_GUIDE_STORAGE_KEY, "shown");
	};

	useEffect(() => {
		if (!showGuide) return;

		const handleOutsideClick = (event) => {
			if (!event.target.closest(`.${styles.root}`)) {
				dismissGuide();
			}
		};

		document.addEventListener("click", handleOutsideClick);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showGuide]);

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
					Tap to shuffle and play a random {mode === "normal" ? "surah" : "live radio"}
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
