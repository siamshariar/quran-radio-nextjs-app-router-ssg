"use client";

import { useEffect, useRef, useState } from "react";
import { refreshOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { PlayerStore, setReciter, setChapterList, setChapter, setLiveRadio, setPlaying, setForceRestart, setSrc, setLiveSrc } from "@/store";
import { AudioStore, saveTrackPausedTime } from "@/store/audio";
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

		// Keep the current track's position saved before switching away, so
		// its resume point in localStorage stays exactly where it was.
		if (mode === "normal") {
			const { reciterId, chapterList, chapterIndex } = PlayerStore.getRawState();
			const chapterNo = chapterList?.[chapterIndex];
			const { currentTime, dur } = AudioStore.getRawState();
			if (chapterNo && dur > 0) {
				saveTrackPausedTime(reciterId, chapterNo, currentTime);
			}
		}

		// Start the newly picked track from 0 instead of resuming wherever the
		// previous track's playback position happened to be — Audio.jsx reads
		// this once and resets it, without touching any saved resume position.
		setForceRestart(true);

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
			// Set src in the same batch as playing=true (instead of letting
			// Audio.jsx derive it one render later) so the play effect runs once,
			// against the new track. Otherwise, when paused, play() first fires on
			// the old src, gets aborted by the src swap, and the new track never
			// starts.
			setSrc(randomChapterList, randomReciterId, randomChapterIndex);
		} else {
			let randomLiveIndex = Math.floor(Math.random() * liveRadios.length);
			if (liveRadios.length > 1 && randomLiveIndex === liveIndex) {
				randomLiveIndex = (randomLiveIndex + 1) % liveRadios.length;
			}
			setLiveRadio(randomLiveIndex);
			setLiveSrc(randomLiveIndex);
		}

		setPlaying(true);
	};

	return (
		<div className={`${classes.root} ${styles.root}`} ref={rootRef}>
			{showGuide && (
				<div className={styles.tooltip}>
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
