import { useEffect, useRef, useState } from "react";
import {
	PlayerStore,
	setChapter,
	setSrc,
	setSrcAllChapters as setSrcFirst,
	setPlaying,
	setReciter,
	setLoading,
	setChapterList,
	setLiveRadio,
	setLiveSrc,
	setDefaultLiveRadio,
	setReciterByReciter,
	setChapterListByList,
} from "@/store";
import { LocalStore } from "@/store/local";
import { useRecentStorage } from "@/hooks/useRecentStorage";
import { AudioStore, setCurrentTime, setDur, setActiveTrack } from "@/store/audio";
import styles from "./index.module.css";
import classNames from "classnames";
import { useLiveRecentStorage } from "@/hooks/useLiveRecentStorage";
import { useRouter } from "next/router";
import { defaultLiveRadios } from "@/data/defaultLiveRadios";
import { getLiveIndexById, getReciterById } from "@/lib/fetch";
import { liveRadios } from "@/data/liveRadios";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { useTrackStorage } from "@/hooks/useTrackStorage"
// import { useIonToast } from "@ionic/react";

const AudioTag = () => {
	const audioRef = useRef(null);
	const reciters = PlayerStore.useState((s) => s.reciters);
	// const liveRadios = PlayerStore.useState((s) => s.liveRadios);
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
	const [isPageLoaded, setIsPageLoaded] = useState(false);
	const { setMode } = useSettingStorage();
	const { saveTrackPausedTime, getTrackPausedTime, saveTrackDuration, getTrackDuration, clearTrackPausedTime } =
    useTrackStorage()

	const setPlaybackMode = async (mode) => {
		await setMode(mode);
		return;
	};

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
		// console.log(c);
		// console.log("loading: " + loading);
		if (loading) return;

		setLoading(true);

		const playPromise = audioRef.current.play();
		// console.log(playPromise);
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					setLoading(false);
					// setPlaying(true);
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
		if (loading) return
		audioRef.current.pause()

    if (mode === "normal" && chapterList && chapterList.length > 0) {
      const chapterNo = chapterList[chapterIndex]
      saveTrackPausedTime(reciterId, chapterNo, audioRef.current.currentTime)
    }
	};

	const handleEnd = () => {
		if (mode === "normal") {
      if (chapterList && chapterList.length > 0) {
        const chapterNo = chapterList[chapterIndex]
        clearTrackPausedTime(reciterId, chapterNo)
      }

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
				// setPlaying(true);
				return;
			} else {
				setChapter(chapterList, index);
				setSrc(chapterList, reciterId, index);
				// setPlaying(true);
				return;
			}
		}
	};

	const setMediaResources = async () => {
		const reciterId = router.query.reciter;
		const chapId = router.query.chapter;
		const reciter = await getReciterById(reciterId);
		const chapterList = reciter.moshaf[0].surah_list.split(",");
		const chapterIndex = chapterList.indexOf(chapId);

		setSrcFirst(chapId, reciter.moshaf);
		setReciterByReciter(reciter);
		setChapterListByList(chapterList);
		setChapter(chapterList, chapterIndex);
		setPlaybackMode("normal");
	};

	const setLiveMediaResources = async () => {
		const liveId = router.query.liveRadio;
		let liveIndex = await getLiveIndexById(liveId);
		setLiveSrc(liveIndex);
		setLiveRadio(liveIndex);
		setPlaybackMode("live");
	};

	// first loading play random
	const router = useRouter();
	useEffect(() => {
		if (router.isReady) {
			setIsPageLoaded(true);
			if (router.query.reciter && router.query.chapter) {
				setMediaResources();
			} else if (router.query.liveRadio) {
				setLiveMediaResources();
			}
		}
	}, [router.isReady]);

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		// only set Live radio from Default json
		const randomLiveIndex = Math.floor(
			Math.random() * defaultLiveRadios.length
		);
		setDefaultLiveRadio(randomLiveIndex);
	}, []);

	useEffect(() => {
		setSrc(chapterList, reciterId, chapterIndex);

    if (mode === "normal" && chapterList && chapterList.length > 0) {
      const chapterNo = chapterList[chapterIndex]
      setActiveTrack(reciterId, chapterNo)
    }
	}, [chapterList, reciterId, chapterIndex]);

	useEffect(() => {
		setLiveSrc(liveIndex);
	}, [liveIndex]);

	useEffect(() => {
		// console.log("playing: " + playing, src, liveSrc);
		if (playing) {
			playAudio();
			audioRef.current.playbackRate = playbackRate;

      if (mode === "normal" && chapterList && chapterList.length > 0) {
        const chapterNo = chapterList[chapterIndex]
        const loadSavedPosition = async () => {
          const pausedTime = await getTrackPausedTime(reciterId, chapterNo)
          if (pausedTime > 0 && Math.abs(audioRef.current.currentTime - pausedTime) > 1) {
            audioRef.current.currentTime = pausedTime
          }
        }
        loadSavedPosition()
      }
		} else {
			pauseAudio();
		}
		// Update the URL without triggering a full page navigation
		if (isPageLoaded) {
			router.replace(
				{
					pathname: router.pathname,
					query:
						mode == "normal"
							? router.pathname == "/reciters/[id]"
								? {
										id: router.query.id,
										reciter: reciterId,
										chapter: chapterList[chapterIndex],
								  }
								: {
										reciter: reciterId,
										chapter: chapterList[chapterIndex],
								  }
							: { liveRadio: liveRadios[liveIndex].id },
				},
				undefined,
				{ shallow: true }
			);
		}
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

      if (mode === "normal" && chapterList && chapterList.length > 0) {
        const chapterNo = chapterList[chapterIndex]
        setActiveTrack(reciterId, chapterNo)
      }
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

	// stop from timer
	useEffect(() => {
		if (!loading && !playing) {
			pauseAudio();
		}
	}, [loading, playing]);

	// Update the URL without triggering a full page navigation
	useEffect(() => {
		if (isPageLoaded) {
			router.replace(
				{
					pathname: router.pathname,
					query:
						mode == "normal"
							? router.pathname == "/reciters/[id]"
								? {
										id: router.query.id,
										reciter: reciterId,
										chapter: chapterList[chapterIndex],
								  }
								: {
										reciter: reciterId,
										chapter: chapterList[chapterIndex],
								  }
							: { liveRadio: liveRadios[liveIndex].id },
				},
				undefined,
				{ shallow: true }
			);
		}
	}, [router.pathname]);

	return (
		<>
			<div className={classNames(styles.snackbar, isToast && styles.show)}>
				<div>
					<p>Source interrupted! Please try another.</p>
				</div>
			</div>
			<audio
				style={{ visibility: "hidden" }}
				ref={audioRef}
				// className={styles.audio}
				controls={false}
				src={mode == "normal" ? src : liveSrc}
				onEnded={handleEnd}
        onTimeUpdate={(e) => {
          setCurrentTime(e.target.currentTime)

          if (mode === "normal" && playing && chapterList && chapterList.length > 0) {
            const chapterNo = chapterList[chapterIndex]
            if (Math.floor(e.target.currentTime) % 5 === 0) {
              saveTrackPausedTime(reciterId, chapterNo, e.target.currentTime)
            }
          }
        }}
				onCanPlay={(e) => {
					if (mode === "normal") {
						setDur(e.target.duration);

            if (chapterList && chapterList.length > 0) {
              const chapterNo = chapterList[chapterIndex]
              saveTrackDuration(reciterId, chapterNo, e.target.duration)
            }
					}
        }}
				></audio>
		</>
	);
};

export default AudioTag;