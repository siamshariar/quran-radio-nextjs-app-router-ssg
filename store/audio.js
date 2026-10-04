import { Store } from "pullstate";
import storage from "@/store/storage";

export const AudioStore = new Store({
	currentTime: 0,
	dur: 0,
	isProgress: false,
	isPlaying: false,
	activeTrack: null,
	trackInfoMap: {},
});

// Display-only: updates the shown position. It used to also persist the
// time into a global "audioPausedTime" key and under whatever activeTrack
// was at that moment - during a track switch that wrote the previous
// track's position under the new track. Per-track progress is now saved
// only by Audio.jsx / the seek bar, which know exactly which track it is.
export const setCurrentTime = (currentTime) => {
	AudioStore.update((s) => {
		s.currentTime = currentTime;
	});
};

export const setDuration = (duration) => {
	AudioStore.update((s) => {
		s.dur = duration;
	});

	const activeTrack = AudioStore.getRawState().activeTrack;
	if (activeTrack) {
		const [reciterId, chapterNo] = activeTrack.split("-");
		saveTrackDuration(reciterId, chapterNo, duration);
	}
};

export const setDur = (duration) => {
	AudioStore.update((s) => {
		s.dur = duration;
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

export const setActiveTrack = (reciterId, chapterNo) => {
	const trackKey = `${reciterId}-${chapterNo}`;
	AudioStore.update((s) => {
		s.activeTrack = trackKey;
	});
};

export const updateTrackInfo = (reciterId, chapterNo, info) => {
	const trackKey = `${reciterId}-${chapterNo}`;

	AudioStore.update((s) => {
		s.trackInfoMap = {
			...s.trackInfoMap,
			[trackKey]: {
				...(s.trackInfoMap[trackKey] || {}),
				...info,
			},
		};
	});
};

export const loadTrackInfo = async (reciterId, chapterNo) => {
	const trackKey = `${reciterId}-${chapterNo}`;

	try {
		const storeInfo = AudioStore.getRawState().trackInfoMap[trackKey];
		if (storeInfo) {
			return storeInfo;
		}

		const pausedTime = await storage
			.getItem("trackPausedTimes")
			.then((data) => {
				if (!data) return 0;
				const parsed = typeof data === "string" ? JSON.parse(data) : data;
				return parsed[trackKey] || 0;
			})
			.catch(() => 0);

		const duration = await storage
			.getItem("trackDurations")
			.then((data) => {
				if (!data) return 0;
				const parsed = typeof data === "string" ? JSON.parse(data) : data;
				return parsed[trackKey] || 0;
			})
			.catch(() => 0);

		const info = { currentTime: pausedTime, duration };

		updateTrackInfo(reciterId, chapterNo, info);

		return info;
	} catch (error) {
		console.error("Error loading track info:", error);
		return { currentTime: 0, duration: 0 };
	}
};

export const loadTrackPausedTime = async (reciterId, chapterNo) => {
	const trackKey = `${reciterId}-${chapterNo}`;
	const savedPausedTimes = JSON.parse((await storage.getItem("trackPausedTimes")) || "{}");
	return savedPausedTimes[trackKey] ? Number.parseFloat(savedPausedTimes[trackKey]) : 0;
};

export const saveTrackPausedTime = async (reciterId, chapterNo, time) => {
	try {
		const trackKey = `${reciterId}-${chapterNo}`;

		updateTrackInfo(reciterId, chapterNo, { currentTime: time });

		const pausedTimes = await storage
			.getItem("trackPausedTimes")
			.then((data) => (typeof data === "string" ? JSON.parse(data || "{}") : data || {}))
			.catch(() => ({}));

		pausedTimes[trackKey] = time;
		await storage.setItem("trackPausedTimes", JSON.stringify(pausedTimes));

		localStorage.setItem("trackPausedTimes", JSON.stringify(pausedTimes));

		return true;
	} catch (error) {
		console.error("Error saving track paused time:", error);
		return false;
	}
};

export const saveTrackDuration = async (reciterId, chapterNo, duration) => {
	try {
		if (!duration || isNaN(duration)) return false;

		const trackKey = `${reciterId}-${chapterNo}`;

		updateTrackInfo(reciterId, chapterNo, { duration });

		const durations = await storage
			.getItem("trackDurations")
			.then((data) => (typeof data === "string" ? JSON.parse(data || "{}") : data || {}))
			.catch(() => ({}));

		durations[trackKey] = duration;
		await storage.setItem("trackDurations", JSON.stringify(durations));

		localStorage.setItem("trackDurations", JSON.stringify(durations));

		return true;
	} catch (error) {
		console.error("Error saving track duration:", error);
		return false;
	}
};

export const loadPlayingState = async () => {
	const isPlaying = await storage.getItem("isPlaying");
	return isPlaying === "true";
};

// Global, track-agnostic position keys from older versions. Restoring them
// on load made a brand-new surah jump to wherever the *previous* surah had
// been paused, so they're no longer read or written - just cleared.
const LEGACY_POSITION_KEYS = ["visualizerProgress", "audioPausedTime"];

export const initializeAudioStore = async () => {
	try {
		// Playback position is deliberately NOT restored here: after a reload
		// or app restart the next surah always starts at 0:00. Only re-opening
		// an item from Recent resumes it (see PlayerStore.resumeAt).
		const isPlaying = await loadPlayingState();
		AudioStore.update((s) => {
			s.isPlaying = isPlaying;
		});

		const activeTrack = AudioStore.getRawState().activeTrack;
		if (activeTrack) {
			const [reciterId, chapterNo] = activeTrack.split("-");
			await loadTrackInfo(reciterId, chapterNo);
		}

		for (const key of LEGACY_POSITION_KEYS) {
			try {
				localStorage.removeItem(key);
			} catch (e) {}
			await storage.removeItem(key);
		}
	} catch (error) {
		console.error("Error initializing audio store:", error);
	}
};
