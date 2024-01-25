import { useEffect, useRef, useState } from "react";
import {
	PlayerStore,
	setChapter,
	setSrc,
	setPlaying,
	setReciter,
	setLoading,
	setChapterList,
	setLiveRadio,
	setLiveSrc,
	setDefaultLiveRadio,
} from "@/store";
import { LocalStore } from "@/store/local";
import { useRecentStorage } from "@/hooks/useRecentStorage";
import { AudioStore, setCurrentTime, setDur } from "@/store/audio";
import styles from "./index.module.css";
import classNames from "classnames";
import { useLiveRecentStorage } from "@/hooks/useLiveRecentStorage";
import { useRouter } from "next/router";
import { defaultLiveRadios } from "@/data/defaultLiveRadios";
// import { useIonToast } from "@ionic/react";

const AudioTag = () => {
	const audioRef = useRef(null);
	const reciters = PlayerStore.useState((s) => s.reciters);
	const liveRadios = PlayerStore.useState((s) => s.liveRadios);
	const src = PlayerStore.useState((s) => s.src);
	const liveSrc = PlayerStore.useState((s) => s.liveSrc);
	const playing = PlayerStore.useState((s) => s.playing);
	const playbackRate = LocalStore.useState((s) => s.settings.playbackRate);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const liveIndex = PlayerStore.useState((s) => s.liveIndex);
	const loading = PlayerStore.useState((s) => s.loading);
	const chapterList = PlayerStore.useState((s) => s.chapterList);
	const loop = PlayerStore.useState((s) => s.loop);
	const shuffle = PlayerStore.useState((s) => s.shuffle);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const currentTime = AudioStore.useState((s) => s.currentTime);
	const isProgress = AudioStore.useState((s) => s.isProgress);

	const [isToast, setIsToast] = useState(false);
	// const [presentToast, dismiss] = useIonToast();
	// const showErrToast = () => {
	// 	console.log("error");
	// 	presentToast({
	// 		message: "Something went wrong!",
	// 		duration: 10000,
	// 		position: "middle",
	// 		cssClass: "error-toast",
	// 	});
	// };

	// to prevent "the play request was interrupted by a call to pause / a new load request" error
	let c = 0;
	const playAudio = () => {
		console.log(c);
		console.log("loading: " + loading);
		if (loading) return;

		setLoading(true);

		const playPromise = audioRef.current.play();
		console.log(playPromise);
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					setLoading(false);
					setPlaying(true);
				})
				.catch((error) => {
					console.error(error);
					setTimeout(() => {
						c += 1;
						if (c > 5) {
							c = 0;
							setPlaying(false);
							setLoading(false);
							//  show some toast
							setIsToast(true);
							// showErrToast();
							return;
						}
						playAudio();
					}, 1000);
				});
		}
	};

	const pauseAudio = () => {
		if (loading) return;
		audioRef.current.pause();
	};

	const handleEnd = () => {
		if (mode === "normal") {
			let index;
			if (loop) {
				setCurrentTime(0);
				audioRef.current.play();
				return;
				// index = chapterIndex;
			} else if (shuffle) {
				index = Math.floor(Math.random() * chapterList.length);
			} else {
				index = chapterIndex + 1;
			}

			if (index >= chapterList.length) {
				setChapter(chapterList, 0);
				setSrc(chapterList, reciterId, 0);
				setPlaying(true);
				return;
			} else {
				setChapter(chapterList, index);
				setSrc(chapterList, reciterId, index);
				setPlaying(true);
				return;
			}
		}
	};

	// first loading play random
	const router = useRouter();
	useEffect(() => {
		const randomReciterIndex = Math.floor(Math.random() * reciters.length);
		const randomReciter = reciters[randomReciterIndex];
		const randomReciterId = randomReciter.id;

		const randomChapterList = randomReciter.moshaf[0].surah_list.split(",");
		const randomChapterIndex = Math.floor(
			Math.random() * randomChapterList.length
		);

		if (router.pathname !== "/reciters/[id]/chapters/[chapId]") {
			setReciter(randomReciterId);
			setChapterList(randomReciterId);
			setChapter(randomChapterList, randomChapterIndex);
		}
	}, []);

	useEffect(() => {
		if (router.pathname !== "/live-radios/[id]") {
			// only set Live radio from Default json
			const randomLiveIndex = Math.floor(
				Math.random() * defaultLiveRadios.length
			);
			setDefaultLiveRadio(randomLiveIndex);
		}
	}, []);

	useEffect(() => {
		setSrc(chapterList, reciterId, chapterIndex);
	}, [chapterList, reciterId, chapterIndex]);

	useEffect(() => {
		setLiveSrc(liveIndex);
	}, [liveIndex]);

	useEffect(() => {
		if (playing) {
			playAudio();
			audioRef.current.playbackRate = playbackRate;
		} else {
			pauseAudio();
		}
		console.log("playing: " + playing, src, liveSrc);
	}, [playing, src, liveSrc, mode, playbackRate]);

	useEffect(() => {
		if (isProgress) {
			audioRef.current.currentTime = currentTime;
		}
	}, [isProgress]);

	// add to recently played
	const { addRecent } = useRecentStorage();
	const { addLiveRecent } = useLiveRecentStorage();
	useEffect(() => {
		if (playing) {
			addRecent(reciterId, chapterIndex);
		}
	}, [playing, reciterId, chapterIndex]);

	useEffect(() => {
		if (playing) {
			addLiveRecent(liveIndex);
		}
	}, [playing, liveIndex]);

	useEffect(() => {
		if (isToast) {
			setTimeout(() => {
				setIsToast(false);
			}, 3000);
		}
	}, [isToast]);

	return (
		<>
			<div className={classNames(styles.snackbar, isToast && styles.show)}>
				<div>
					<p>Something went wrong!</p>
				</div>
			</div>
			<audio
				style={{ visibility: "hidden" }}
				ref={audioRef}
				// className={styles.audio}
				controls={false}
				src={mode == "normal" ? src : liveSrc}
				onEnded={handleEnd}
				onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
				onCanPlay={(e) => {
					if (mode === "normal") {
						setDur(e.target.duration);
					}
				}}></audio>
		</>
	);
};

export default AudioTag;
