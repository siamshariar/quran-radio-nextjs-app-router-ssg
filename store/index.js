import { Store } from "pullstate";
import { chapters } from "../data/chapters";
import { reciters } from "../data/reciters";

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

  open: true,
  mini: false,

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

  src: null,

  loading: false,
  playing: false,
  playbackRate: 1,
  currentTime: 0,
  dur: 0,

  isProgress: false,
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

export const setChapter = (currentChapters, index) => {
  const chapterNo = currentChapters[index];
  const chapter = chapters[chapterNo - 1]; // base chapter
  PlayerStore.update((s) => {
    s.chapterIndex = index;
    s.chapterName = chapter.name;
    s.chapterMeaning = chapter.meaning;
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

export const setPlaybackRate = (rate) => {
  PlayerStore.update((s) => {
    s.playbackRate = rate;
  });
};

export const setCurrentTime = (currentTime) => {
  PlayerStore.update((s) => {
    s.currentTime = currentTime;
  });
};

export const setDur = (dur) => {
  PlayerStore.update((s) => {
    s.dur = dur;
  });
};

export const setIsProgress = (isProgress) => {
  PlayerStore.update((s) => {
    s.isProgress = isProgress;
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
