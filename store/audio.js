import { Store } from "pullstate";

export const AudioStore = new Store({
	currentTime: 0,
	dur: 0,
	isProgress: false,
	isPlaying: false,
});

export const setCurrentTime = (currentTime) => {
	AudioStore.update((s) => {
		s.currentTime = currentTime;
		localStorage.setItem("audioPausedTime", currentTime);
	});
};

export const setDur = (dur) => {
	AudioStore.update((s) => {
		s.dur = dur;
	});
};

export const setIsProgress = (isProgress) => {
	AudioStore.update((s) => {
		s.isProgress = isProgress;
	});
};

export const setIsPlaying = (isPlaying) => {
  AudioStore.update((s) => {
    s.isPlaying = isPlaying;
    localStorage.setItem("isPlaying", isPlaying);
  });
};

export const loadPausedTime = () => {
  const pausedTime = localStorage.getItem("audioPausedTime");
  return pausedTime ? parseFloat(pausedTime) : 0;
};

export const loadPlayingState = () => {
  const isPlaying = localStorage.getItem("isPlaying");
  return isPlaying === "true";
};

export const initializeAudioStore = () => {
  AudioStore.update((s) => {
    s.currentTime = loadPausedTime();
    s.isPlaying = loadPlayingState();
  });
};