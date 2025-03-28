import { Store } from "pullstate";
import storage from "@/store/storage";

export const AudioStore = new Store({
	currentTime: 0,
	dur: 0,
	isProgress: true,
	isPlaying: false,
	activeTrack: null,
	trackInfoMap: {}, 
});

export const setCurrentTime = (time) => {
	AudioStore.update((s) => {
		s.currentTime = time
	});
};

export const setDuration = (duration) => {
	AudioStore.update((s) => {
		s.dur = duration
	});
};

export const setDur = (duration) => {
	AudioStore.update((s) => {
		s.dur = duration
	});
};

export const setIsPlaying = (isPlaying) => {
  AudioStore.update((s) => {
    s.isPlaying = isPlaying
  })
}

export const setIsProgress = (isProgress) => {
  AudioStore.update((s) => {
    s.isProgress = isProgress
  })
}

export const setActiveTrack = (reciterId, chapterNo) => {
  const trackKey = `${reciterId}-${chapterNo}`
  AudioStore.update((s) => {
    s.activeTrack = trackKey
  })
}

export const updateTrackInfo = (reciterId, chapterNo, info) => {
  const trackKey = `${reciterId}-${chapterNo}`

  AudioStore.update((s) => {
    s.trackInfoMap = {
      ...s.trackInfoMap,
      [trackKey]: {
        ...(s.trackInfoMap[trackKey] || {}),
        ...info,
      },
    }
  })
}

export const loadTrackInfo = async (reciterId, chapterNo) => {
  const trackKey = `${reciterId}-${chapterNo}`

  try {
    const storeInfo = AudioStore.getRawState().trackInfoMap[trackKey]
    if (storeInfo) {
      return storeInfo
    }

    const pausedTime = await storage
      .getItem("trackPausedTimes")
      .then((data) => {
        if (!data) return 0
        const parsed = typeof data === "string" ? JSON.parse(data) : data
        return parsed[trackKey] || 0
      })
      .catch(() => 0)

    const duration = await storage
      .getItem("trackDurations")
      .then((data) => {
        if (!data) return 0
        const parsed = typeof data === "string" ? JSON.parse(data) : data
        return parsed[trackKey] || 0
      })
      .catch(() => 0)

    const info = { currentTime: pausedTime, duration }

    updateTrackInfo(reciterId, chapterNo, info)

    return info
  } catch (error) {
    console.error("Error loading track info:", error)
    return { currentTime: 0, duration: 0 }
  }
}

export const saveTrackPausedTime = async (reciterId, chapterNo, time) => {
  try {
    const trackKey = `${reciterId}-${chapterNo}`

    updateTrackInfo(reciterId, chapterNo, { currentTime: time })

    const pausedTimes = await storage
      .getItem("trackPausedTimes")
      .then((data) => (typeof data === "string" ? JSON.parse(data || "{}") : data || {}))
      .catch(() => ({}))

    pausedTimes[trackKey] = time
    await storage.setItem("trackPausedTimes", JSON.stringify(pausedTimes))

    localStorage.setItem("trackPausedTimes", JSON.stringify(pausedTimes))

    return true
  } catch (error) {
    console.error("Error saving track paused time:", error)
    return false
  }
}

export const saveTrackDuration = async (reciterId, chapterNo, duration) => {
  try {
    if (!duration || isNaN(duration)) return false

    const trackKey = `${reciterId}-${chapterNo}`

    updateTrackInfo(reciterId, chapterNo, { duration })

    const durations = await storage
      .getItem("trackDurations")
      .then((data) => (typeof data === "string" ? JSON.parse(data || "{}") : data || {}))
      .catch(() => ({}))

    durations[trackKey] = duration
    await storage.setItem("trackDurations", JSON.stringify(durations))

    localStorage.setItem("trackDurations", JSON.stringify(durations))

    return true
  } catch (error) {
    console.error("Error saving track duration:", error)
    return false
  }
}

export const initializeAudioStore = async () => {
  try {
    const activeTrack = AudioStore.getRawState().activeTrack
    if (activeTrack) {
      const [reciterId, chapterNo] = activeTrack.split("-")
      await loadTrackInfo(reciterId, chapterNo)
    }
    
    const visualizerProgress = await storage.getItem("visualizerProgress")
    if (visualizerProgress && !isNaN(visualizerProgress)) {
      setCurrentTime(visualizerProgress)
    }
  } catch (error) {
    console.error("Error initializing audio store:", error)
  }
}