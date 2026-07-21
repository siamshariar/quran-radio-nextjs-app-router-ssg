import classNames from "classnames";
import {
	PlayerStore,
	setReciter,
	setChapter,
	setSrc,
	setPlaying,
	setChapterListByList,
} from "@/store";
import { LocalStore } from "@/store/local";
import { trashOutline } from "ionicons/icons";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../utils/formatDate"
import {
  AudioStore,
  setCurrentTime,
  setIsPlaying,
  initializeAudioStore,
  setDuration,
  setActiveTrack,
  loadTrackInfo,
} from "@/store/audio"
import { useEffect, useState } from "react"
import storage from "@/store/storage" // import storage
import { useTrackStorage } from "@/hooks/useTrackStorage"

const FavRecentList = ({ item, handleRemoveFavorite, handleRemoveRecent, noRemoveIcon, isRecent }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const { setMode } = useSettingStorage();

  const trackInfoMap = AudioStore.useState((s) => s.trackInfoMap) || {}
  const trackKey = `${item.reciterId}-${item.chapterNo}`
  const trackInfo = trackInfoMap && trackKey in trackInfoMap ? trackInfoMap[trackKey] : { currentTime: 0, duration: 0 }

  const currentTime = AudioStore.useState((s) => s.currentTime)
  
  const isCurrentTrack = reciterId === item.reciterId && chapterIndex === item.chapterIndex;
  const dur = AudioStore.useState((s) => s.dur)
  const [trackDuration, setTrackDuration] = useState(0)
  const [resumePosition, setResumePosition] = useState(0)

  const { saveTrackPausedTime, getTrackPausedTime, saveTrackDuration, getTrackDuration } = useTrackStorage()

  useEffect(() => {
    initializeAudioStore()

    const loadTrackData = async () => {
      if (trackInfo.duration > 0) {
        setTrackDuration(trackInfo.duration)
      } else {
        const info = await loadTrackInfo(item.reciterId, item.chapterNo)
        if (info.duration > 0) {
          setTrackDuration(info.duration)
        }
      }

      const savedPosition = await getTrackPausedTime(item.reciterId, item.chapterNo)
      if (savedPosition > 0) {
        setResumePosition(savedPosition)
      } else if (item.pausedAt > 0) {
        setResumePosition(item.pausedAt)
      }
    }

    loadTrackData()
  }, [item.reciterId, item.chapterNo, item.pausedAt])

  useEffect(() => {
    if (trackInfo.duration > 0) {
      setTrackDuration(trackInfo.duration)
    }
  }, [trackInfo.duration])

  useEffect(() => {
    if (reciterId === item.reciterId && chapterIndex === item.chapterIndex && dur > 0) {
      setTrackDuration(dur)
      saveTrackDuration(item.reciterId, item.chapterNo, dur)
    }
  }, [dur, reciterId, chapterIndex, item.reciterId, item.chapterIndex, item.chapterNo])

	const setPlaybackMode = async (mode) => {
		await setMode(mode);
		return;
	};

	const handleReciterChange = async () => {
		if (mode === "live") {
			setPlaybackMode("normal");
		}

		setReciter(item.reciterId);
		setChapterListByList(item.chapterList);
		setChapter(item.chapterList, item.chapterIndex);
		setSrc(item.chapterList, item.reciterId, item.chapterIndex);
		setPlaying(true);

    setActiveTrack(item.reciterId, item.chapterNo)

    const pausedTime = await getTrackPausedTime(item.reciterId, item.chapterNo)

    if (pausedTime && pausedTime > 0) {
      setCurrentTime(pausedTime)
    } else if (item.pausedAt && item.pausedAt > 0) {
      setCurrentTime(item.pausedAt)
    } else if (trackInfo.currentTime > 0) {
      setCurrentTime(trackInfo.currentTime)
    } else {
      setCurrentTime(0)
    }

    const duration = getTrackDuration(item.reciterId, item.chapterNo)
    if (duration && duration > 0) {
      setDuration(duration)
    } else if (trackInfo.duration > 0) {
      setDuration(trackInfo.duration)
    }
  }

	const play = () => {
		if (mode === "live") {
			setPlaybackMode("normal");
		}
		setPlaying(true);
		setIsPlaying(true);
	};

	const pause = async () => {
		setPlaying(false);
		setIsPlaying(false);

    await saveTrackPausedTime(item.reciterId, item.chapterNo, currentTime)

    await storage.setItem("visualizerProgress", currentTime)

    await storage.setItem("audioPausedTime", currentTime)
    localStorage.setItem("audioPausedTime", currentTime.toString())

    updatePausedAtTime(item.reciterId, item.chapterNo, currentTime)
  }

  const updatePausedAtTime = (reciterId, chapterNo, time) => {
    const recents = LocalStore.getRawState().recent
    const updatedRecents = recents.map((recent) => {
      if (recent.reciterId === reciterId && recent.chapterNo === chapterNo) {
        return { ...recent, pausedAt: time }
      }
      return recent
    })
    LocalStore.update((s) => ({ ...s, recent: updatedRecents }))

    storage.setItem("recent", JSON.stringify(updatedRecents))
  }

  const getDisplayCurrentTime = () => {
    if (isCurrentTrack && playing) {
      return currentTime;
    }
    
    if (trackInfo.currentTime > 0) {
      return trackInfo.currentTime;
    }
    if (resumePosition > 0) {
      return resumePosition;
    }
    if (item.pausedAt > 0) {
      return item.pausedAt;
    }
    return 0;
  };

  const handleRemove = () => {
    if (handleRemoveFavorite) {
      handleRemoveFavorite(item.reciterId, item.chapterNo)
    } else if (handleRemoveRecent) {
      handleRemoveRecent(item.reciterId, item.chapterNo)
    }
  }

  const formatDur = (s) => {
    if (!s || isNaN(s)) return "00:00"
    const h = ~~(s / 3600)
    const m = ~~((s % 3600) / 60)
    const rs = ~~(s % 60)
    return `${h > 0 ? String(h).padStart(2, "0").concat(":") : ""}${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`
  }

  const displayCurrentTime = getDisplayCurrentTime();
  const displayDuration = trackInfo.duration || trackDuration || 0;


  useEffect(() => {
    if (isCurrentTrack) {
    }
  }, [currentTime, isCurrentTrack]);

	return (
		<div className={classNames(styles.card, styles.fav_card, styles.recent)}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<Link href={`/reciters/${item.reciterId}`}>
						<div className={styles.image}>
							<Image
								src={
									item.reciterImage
										? item.reciterImage
										: "/img/reciters/quran-reciting.jpg"
								}
								alt=""
								width={100}
								height={100}
								loading="eager"
								unoptimized
							/>
						</div>
					</Link>
				</div>

				<Link href={`/reciters/${item.reciterId}`} className={styles.middle}>
					{/* <div className={styles.middle}> */}
					<div className={styles.middle}>
            <div className={styles.name}>{item.reciterName}</div>
            <div className={styles.meaning}>- {item.chapterName}</div>
            <div className={styles.date}>{formatDate(item.createdAt)}</div>
            <div className={styles.pausedAt}>
              {isRecent && `Duration: ${formatDur(displayCurrentTime)} / ${formatDur(displayDuration)}`}
            </div>
          </div>
				</Link>

				<div className={classNames(styles.right, styles.btns)}>
					{!noRemoveIcon && 
						<IonIcon
							icon={trashOutline}
							slot="start"
							class={styles.icon}
							onClick={handleRemove}
						/>
					}
					{reciterId === item.reciterId &&
					item.chapterIndex === chapterIndex ? (
						playing && mode === "normal" ? (
							<IonIcon
								icon={playCircle}
								slot="start"
								className={styles.icon}
								onClick={pause}
							/>
						) : (
							<IonIcon
								icon={pauseCircle}
								slot="start"
								className={styles.icon}
								onClick={play}
							/>
						)
					) : (
						<IonIcon
							icon={pauseCircle}
							slot="start"
							className={styles.icon}
							onClick={() => handleReciterChange()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default FavRecentList;
