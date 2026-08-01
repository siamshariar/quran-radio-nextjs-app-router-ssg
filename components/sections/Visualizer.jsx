import { AudioStore, setCurrentTime, setIsProgress, initializeAudioStore } from "@/store/audio"
import styles from "./Visualizer.module.css";
import { LocalStore } from "@/store/local";
import classNames from "classnames";
import { useEffect, useState } from "react";
import storage from "@/store/storage" // import storage;
import { useTrackStorage } from "@/hooks/useTrackStorage";
import { PlayerStore } from "@/store";

const Visualizer = () => {
	const currentTime = AudioStore.useState((s) => s.currentTime);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const dur = AudioStore.useState((s) => s.dur);

	// const formatDur = (s) => {
	// 	// let h = s - (s %= 360);
	// 	return (s - (s %= 60)) / 60 + (s < 10 ? ":0" : ":") + ~~s;
	// };
  const isPlaying = AudioStore.useState((s) => s.isPlaying)
  const reciterId = PlayerStore.useState((s) => s.reciterId)
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex)
  const chapterList = PlayerStore.useState((s) => s.chapterList)
  const trackInfoMap = AudioStore.useState((s) => s.trackInfoMap) || {}

  const [progressWidth, setProgressWidth] = useState(100)
  const { saveTrackPausedTime } = useTrackStorage()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      await initializeAudioStore()
      setIsInitialized(true)
    }
    init()
  }, [])

  useEffect(() => {
    if (mode === "normal" && dur) {
	    const nextWidth = (currentTime * 100) / dur
	    setProgressWidth(Math.max(0, Math.min(100, Number.isFinite(nextWidth) ? nextWidth : 0)))
    } else {
      setProgressWidth(100)
    }
  }, [mode, currentTime, dur, isInitialized])

  useEffect(() => {
    if (mode === "normal" && dur && isInitialized) {
      localStorage.setItem("audioPausedTime", currentTime.toString())
      storage.setItem("audioPausedTime", currentTime)

      storage.setItem("visualizerProgress", currentTime)

      if (chapterList && chapterList.length > 0) {
        const chapterNo = chapterList[chapterIndex]
        saveTrackPausedTime(reciterId, chapterNo, currentTime)

        updateRecentPausedTime(reciterId, chapterNo, currentTime)
      }
    }
  }, [currentTime, mode, dur, reciterId, chapterIndex, chapterList, isInitialized])

  const updateRecentPausedTime = (reciterId, chapterNo, time) => {
    if (Math.floor(time) % 5 !== 0) return

    const recents = LocalStore.getRawState().recent
    const updatedRecents = recents.map((recent) => {
      if (recent.reciterId === reciterId && recent.chapterNo === chapterNo) {
        return { ...recent, pausedAt: time }
      }
      return recent
    })

    if (JSON.stringify(recents) !== JSON.stringify(updatedRecents)) {
      LocalStore.update((s) => ({ ...s, recent: updatedRecents }))

      storage.setItem("recent", JSON.stringify(updatedRecents))
    }
  }

	function formatDur(s) {
		// ~~ => math.floor()
		const h = ~~(s / 3600);
		const m = ~~((s % 3600) / 60);
		const rs = ~~(s % 60);

		const formattedTime = `${
			h > 0 ? String(h).padStart(2, "0").concat(":") : ""
		}${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`;

		return formattedTime;
	}

	const handleProgress = (progress) => {
		setIsProgress(false);
		const compute = (Math.max(0, Math.min(100, Number(progress))) * dur) / 100;
		setCurrentTime(compute);

    localStorage.setItem("audioPausedTime", compute.toString())
    storage.setItem("audioPausedTime", compute)

    storage.setItem("visualizerProgress", compute)

    if (chapterList && chapterList.length > 0) {
      const chapterNo = chapterList[chapterIndex]
      saveTrackPausedTime(reciterId, chapterNo, compute)

      updateRecentPausedTime(reciterId, chapterNo, compute)
    }

		setTimeout(() => {
			setIsProgress(true);
		}, 1);
	};

  let trackInfo = { currentTime: 0, duration: 0 }
  if (chapterList && chapterList.length > 0) {
    const chapterNo = chapterList[chapterIndex]
    const trackKey = `${reciterId}-${chapterNo}`
    if (trackInfoMap && trackKey in trackInfoMap) {
      trackInfo = trackInfoMap[trackKey]
    }
  }

	return (
		<div className={styles.root}>
			{/* <div className={styles.duration}>
				<div className={styles.start}>{formatDur(currentTime)}</div>
				{mode === "normal" ? (
					<div className={styles.end}>{formatDur(dur)}</div>
				) : (
					<div className={styles.end}>Live</div>
				)}
			</div> */}

			<div className={styles.start}>
				<span
					style={{ width: `${formatDur(currentTime).length > 5 ? 48 : 35}px` }}>
					{formatDur(currentTime)}
				</span>
			</div>
			<div className={styles.progress}>
				<div
					className={classNames(styles.label)}
					style={{
						width: `${progressWidth}%`,
					}}></div>
				<input
					disabled={mode === "live" ? true : false}
					type="range"
					min="0"
					max="100"
					value={dur && mode === "normal" ? (currentTime * 100) / dur : 100}
					onChange={(e) => handleProgress(e.target.value)}
					name="progresBar"
				/>
			</div>
			{mode === "normal" ? (
				<div className={styles.end}>
					<span
						style={{
							width: `${formatDur(dur).length > 5 ? 48 : 35}px`,
						}}>
						{formatDur(dur)}
					</span>
				</div>
			) : (
				<div className={styles.end}>Live</div>
			)}
		</div>
	);
};

export default Visualizer;
