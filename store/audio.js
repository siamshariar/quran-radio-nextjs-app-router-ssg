import { Store } from "pullstate";

export const AudioStore = new Store({
	currentTime: 0,
	dur: 0,
	isProgress: false,
});

export const setCurrentTime = (currentTime) => {
	AudioStore.update((s) => {
		s.currentTime = currentTime;
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
