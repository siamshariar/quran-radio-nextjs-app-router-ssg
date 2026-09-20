"use client";

import { useEffect, useRef, useState } from "react";
import { refreshOutline, closeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { PlayerStore, setReciter, setChapterList, setChapter, setLiveRadio, setPlaying } from "@/store";
import { LocalStore } from "@/store/local";
import { liveRadios } from "@/data/liveRadios";
import styles from "./RandomPlay.module.css";

const RANDOM_PLAY_GUIDE_STORAGE_KEY = "randomPlayGuideShown";

// Show the guide 40-50s after the user opens the site, once per browser.
const GUIDE_DELAY_MS = (Math.floor(Math.random() * 11) + 40) * 1000;

const RandomPlay = ({ classes = {} }) => {
	const reciters = PlayerStore.useState((s) => s.reciters);
	const liveIndex = PlayerStore.useState((s) => s.liveIndex);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const [showGuide, setShowGuide] = useState(false);
	const rootRef = useRef(null);

	const dismissGuide = () => {
		setShowGuide(false);
		localStorage.setItem(RANDOM_PLAY_GUIDE_STORAGE_KEY, "shown");
	};

	useEffect(() => {
		const guideShown = localStorage.getItem(RANDOM_PLAY_GUIDE_STORAGE_KEY) === "shown";
		if (guideShown) return;

		const showTimer = window.setTimeout(() => setShowGuide(true), GUIDE_DELAY_MS);
		return () => window.clearTimeout(showTimer);
	}, []);

	useEffect(() => {
		if (!showGuide) return;

		const handleOutsideClick = (event) => {
			if (rootRef.current && !rootRef.current.contains(event.target)) {
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
		<div className={`${classes.root} ${styles.root}`} ref={rootRef}>
			{showGuide && (
				<div className={styles.tooltip}>
					<div
						className={styles.tooltip_close}
						onClick={(event) => {
							event.stopPropagation();
							dismissGuide();
						}}>
						<IonIcon icon={closeOutline} />
					</div>
					Click to Shuffle
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
