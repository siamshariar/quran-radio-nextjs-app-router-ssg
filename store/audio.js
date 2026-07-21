import { Store } from "pullstate";
import storage from "./storage";

export const AudioStore = new Store({
	currentTime: 0,
	dur: 0,
	isProgress: false,
	isPlaying: false,
	activeTrack: null,
});

export const setCurrentTime = async (currentTime) => {
	AudioStore.update((s) => {
		s.currentTime = currentTime;
	});
  await storage.setItem("audioPausedTime", currentTime)

  const activeTrack = AudioStore.getRawState().activeTrack
  if (activeTrack) {
    const { reciterId, chapterNo } = activeTrack
    saveTrackPausedTime(reciterId, chapterNo, currentTime)
  }
}

export const setDur = (dur) => {
	AudioStore.update((s) => {
		s.dur = dur;
	});
  const activeTrack = AudioStore.getRawState().activeTrack
  if (activeTrack) {
    const { reciterId, chapterNo } = activeTrack
    saveTrackDuration(reciterId, chapterNo, dur)
  }
}

export const setIsProgress = (isProgress) => {
	AudioStore.update((s) => {
		s.isProgress = isProgress;
	});
};

export const setIsPlaying = async (isPlaying) => {
  AudioStore.update((s) => {
    s.isPlaying = isPlaying;
  });
  await storage.setItem("isPlaying", isPlaying);
};

export const setActiveTrack = (reciterId, chapterNo) => {
  AudioStore.update((s) => {
    s.activeTrack = { reciterId, chapterNo }
  })
}

export const loadPausedTime = async () => {
  const pausedTime = await storage.getItem("audioPausedTime");
  return pausedTime ? Number.parseFloat(pausedTime) : 0;
};

export const loadTrackPausedTime = async (reciterId, chapterNo) => {
  const trackKey = `${reciterId}-${chapterNo}`
  const savedPausedTimes = JSON.parse((await storage.getItem("trackPausedTimes")) || "{}")
  return savedPausedTimes[trackKey] ? Number.parseFloat(savedPausedTimes[trackKey]) : 0
}

export const saveTrackPausedTime = async (reciterId, chapterNo, time) => {
  const trackKey = `${reciterId}-${chapterNo}`
  const savedPausedTimes = JSON.parse((await storage.getItem("trackPausedTimes")) || "{}")
  savedPausedTimes[trackKey] = time
  await storage.setItem("trackPausedTimes", JSON.stringify(savedPausedTimes))
}

export const saveTrackDuration = async (reciterId, chapterNo, duration) => {
  const trackKey = `${reciterId}-${chapterNo}`
  const savedDurations = JSON.parse((await storage.getItem("trackDurations")) || "{}")
  savedDurations[trackKey] = duration
  await storage.setItem("trackDurations", JSON.stringify(savedDurations))
}

export const loadPlayingState = async () => {
  const isPlaying = await storage.getItem("isPlaying");
  return isPlaying === "true";
};

export const initializeAudioStore = async () => {
  const currentTime = await loadPausedTime();
  const isPlaying = await loadPlayingState();
  AudioStore.update((s) => {
    s.currentTime = currentTime;
    s.isPlaying = isPlaying;
  });

  // Retrieve the saved audio pause duration from localStorage
  const savedPausedTime = localStorage.getItem("audioPausedTime");
  if (savedPausedTime) {
    AudioStore.update((s) => {
      s.currentTime = Number.parseFloat(savedPausedTime);
    });
  }
};

export const setDuration = (duration) => {
  AudioStore.update((s) => ({
    ...s,
    dur: duration,
  }))

  const activeTrack = AudioStore.getRawState().activeTrack
  if (activeTrack) {
    const { reciterId, chapterNo } = activeTrack
    saveTrackDuration(reciterId, chapterNo, duration)
  }
}