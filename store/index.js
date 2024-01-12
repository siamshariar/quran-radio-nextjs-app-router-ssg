import { Store } from "pullstate";
import { chapters } from "../data/chapters";
import { reciters } from "../data/reciters";
import { liveRadios } from "@/data/liveRadios";

const getReciterById = (reciterId) => {
	const reciter = reciters.find((obj) => obj.id === reciterId);
	return reciter;
};

const getChapterList = (reciterId) => {
	const reciter = reciters.find((obj) => obj.id === reciterId);
	const chapterList = reciter.moshaf[0].surah_list.split(",");
	return chapterList;
};

export const PlayerStore = new Store({
	chapters, // all chapters info
	reciters, // all reciters
	liveRadios, // all live radios

	open: true,
	mini: false,
	sliderDown: false,

	// current reciter
	reciter: getReciterById(10), // reciter object
	reciterId: 10, // reciter id
	reciterLetter: null,
	reciterName: null,
	reciterImage: null,
	reciterSlug: null,

	// current chapter
	chapterList: getChapterList(10),
	chapterIndex: 0, // index of current chapter list
	chapterName: null,
	chapterMeaning: null,

	// current live radio
	liveIndex: 0,
	currLive: liveRadios[0],

	src: null,
	liveSrc: null,

	loading: false,
	playing: false,
	loop: false,
	shuffle: false,
	playbackRate: 1,

	timer: {
		isSet: false,
		value: 0,
	},
});

export const setPlayerOpen = (open) => {
	PlayerStore.update((s) => {
		s.open = open;
	});
};

export const setPlayerMini = (isMini) => {
	PlayerStore.update((s) => {
		s.mini = isMini;
	});
};

export const setSliderDown = (v) => {
	PlayerStore.update((s) => {
		s.sliderDown = v;
	});
};

export const setReciter = (reciterId) => {
	const reciter = getReciterById(reciterId);

	PlayerStore.update((s) => {
		s.reciter = reciter;
		s.reciterId = reciter.id;
		s.reciterName = reciter.name;
		s.reciterLetter = reciter.letter;
		s.reciterSlug = "";
		s.reciterImage = "mishary-rashid-alafasy-profile.webp";
	});
};

export const setChapterList = (reciterId) => {
	PlayerStore.update((s) => {
		s.chapterList = getChapterList(reciterId);
	});
};

export const setChapterListByList = (chpaterList) => {
	PlayerStore.update((s) => {
		s.chapterList = chpaterList;
	});
};

export const setChapter = (currentChapters, index) => {
	const chapterNo = currentChapters[index];
	const chapter = chapters[chapterNo - 1]; // base chapter
	PlayerStore.update((s) => {
		s.chapterIndex = index;
		s.chapterName = chapter.name;
		s.chapterMeaning = chapter.meaning;
	});
};

export const setLiveRadio = (index) => {
	PlayerStore.update((s) => {
		s.liveIndex = index;
		s.currLive = liveRadios[index];
	});
};

export const setSrc = (currentChapters, reciterId, chapterIndex) => {
	let chapterNo = currentChapters[chapterIndex];
	let str = "0000" + chapterNo;
	str = str.slice(-3);

	const reciter = getReciterById(reciterId);
	const src = reciter.moshaf[0].server + str + ".mp3";

	PlayerStore.update((s) => {
		s.src = src;
	});
};

export const setLiveSrc = (liveIndex) => {
	PlayerStore.update((s) => {
		s.liveSrc = liveRadios[liveIndex].liveUrl;
	});
};

export const setLoading = (isLoading) => {
	PlayerStore.update((s) => {
		s.loading = isLoading;
	});
};

export const setPlaying = (isPlaying) => {
	PlayerStore.update((s) => {
		s.playing = isPlaying;
	});
};

export const setLoop = (isLoop) => {
	PlayerStore.update((s) => {
		s.loop = isLoop;
	});
};

export const setShuffle = (v) => {
	PlayerStore.update((s) => {
		s.shuffle = v;
	});
};

export const setPlaybackRate = (rate) => {
	PlayerStore.update((s) => {
		s.playbackRate = rate;
	});
};

export const setTimer = (isSet, value) => {
	PlayerStore.update((s) => {
		s.timer = {
			isSet: isSet,
			value: value,
		};
	});
};
