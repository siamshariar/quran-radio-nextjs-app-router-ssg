import classNames from "classnames";
import {
	playOutline as playIcon,
	pauseOutline as pauseIcon,
	nextOutline as playNextIcon,
	previousOutline as playPreviousIcon,
	repeat as repeatIcon,
	shuffle as shuffleIcon,
} from "@/icons";
import {
	PlayerStore,
	setChapter,
	setSrc,
	setPlaying,
	setLoop,
	setLiveRadio,
	setLiveSrc,
	setShuffle,
} from "@/store";
import Loader from "../utils/Loader";
import styles from "./ControlButtons.module.css";
import { IonIcon } from "@ionic/react";
import { liveRadios } from "@/data/liveRadios";
import { LocalStore } from "@/store/local";
import { repeat, repeatSharp } from "ionicons/icons";
import { useEffect } from "react";

const ControlButtons = () => {
	const playing = PlayerStore.useState((s) => s.playing);
	const currentChapters = PlayerStore.useState((s) => s.chapterList);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const liveIndex = PlayerStore.useState((s) => s.liveIndex);
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const loading = PlayerStore.useState((s) => s.loading);
	const loop = PlayerStore.useState((s) => s.loop);
	const shuffle = PlayerStore.useState((s) => s.shuffle);
	const mode = LocalStore.useState((s) => s.settings.mode);

	const play = () => {
		setPlaying(true);
	};

	const pause = () => {
		setPlaying(false);
	};

	const playPrevious = () => {
		if (loading) return;
		if (mode === "normal") {
			const index = chapterIndex - 1;
			if (index < 0) return;
			setChapter(currentChapters, index);
			setSrc(currentChapters, reciterId, index);
			setPlaying(true);
		} else {
			const index = liveIndex - 1;
			if (index < 0) return;
			setLiveRadio(index);
			setLiveSrc(index);
			setPlaying(true);
		}
	};

	const playNext = () => {
		if (loading) return;
		if (mode === "normal") {
			const index = chapterIndex + 1;
			if (index >= currentChapters.length) return;
			setChapter(currentChapters, index);
			setSrc(currentChapters, reciterId, index);
			setPlaying(true);
		} else {
			const index = liveIndex + 1;
			if (index >= liveRadios.length) return;
			setLiveRadio(index);
			setLiveSrc(index);
			setPlaying(true);
		}
	};

	const handleRepeat = () => {
		setLoop(!loop);
		return;
	};

	const handleShuffle = () => {
		setShuffle(!shuffle);
	};

	useEffect(() => {
		const audioElement = document.querySelector("audio");
		const handlePlay = () => setPlaying(true);
		const handlePause = () => setPlaying(false);

		if (audioElement) {
			audioElement.addEventListener("play", handlePlay);
			audioElement.addEventListener("pause", handlePause);
		}

		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				if (audioElement) {
					if (audioElement.paused) {
						setPlaying(false);
					} else {
						setPlaying(true);
					}
				}
			}
		});

		return () => {
			if (audioElement) {
				audioElement.removeEventListener("play", handlePlay);
				audioElement.removeEventListener("pause", handlePause);
			}
		};
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.controls}>
				<div
					className={classNames(
						styles.btn,
						styles.small,
						loop && mode === "normal" && styles.loop
					)}
					onClick={handleRepeat}>
					<IonIcon
						icon={repeat}
						slot="start"
						class={`${styles.icon} ${styles.repeat}`}
					/>
				</div>

				<div
					className={classNames(styles.btn, styles.small, styles.shadow)}
					onClick={playPrevious}>
					<IonIcon icon={playPreviousIcon} slot="start" class={styles.icon} />
				</div>

				{playing && (
					<div
						className={classNames(
							styles.btn,
							styles.large,
							styles.shadow,
							styles.play
						)}
						onClick={pause}>
						{loading && <Loader />}
						{!loading && (
							<IonIcon icon={playIcon} slot="start" class={styles.icon} />
						)}
					</div>
				)}

				{!playing && (
					<div
						className={classNames(
							styles.btn,
							styles.large,
							styles.shadow,
							styles.play
						)}
						onClick={play}>
						{loading && <Loader />}
						{!loading && (
							<IonIcon icon={pauseIcon} slot="start" class={styles.icon} />
						)}
					</div>
				)}

				<div
					className={classNames(styles.btn, styles.small, styles.shadow)}
					onClick={playNext}>
					<IonIcon icon={playNextIcon} slot="start" class={styles.icon} />
				</div>

				<div
					className={classNames(
						styles.btn,
						styles.small,
						shuffle && mode === "normal" && styles.shuffle
					)}
					onClick={handleShuffle}>
					<IonIcon icon={shuffleIcon} slot="start" class={styles.icon} />
				</div>
			</div>
		</div>
	);
};

export default ControlButtons;
