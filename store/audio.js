import { Store } from "pullstate";
import storage from "./storage";

export const AudioStore = new Store({
	currentTime: 0,
	dur: 0,
	isProgress: false,
	isPlaying: false,
});

export const setCurrentTime = async (currentTime) => {
	AudioStore.update((s) => {
		s.currentTime = currentTime;
	});
  await storage.setItem("audioPausedTime", currentTime);
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

export const setIsPlaying = async (isPlaying) => {
  AudioStore.update((s) => {
    s.isPlaying = isPlaying;
  });
  await storage.setItem("isPlaying", isPlaying);
};

export const loadPausedTime = async () => {
  const pausedTime = await storage.getItem("audioPausedTime");
  return pausedTime ? parseFloat(pausedTime) : 0;
};

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
};