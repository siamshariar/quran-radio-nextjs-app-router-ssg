import { Store } from "pullstate";
import { chapters } from "../data/chapters";
import { reciters } from "../data/reciters";
import { recitations } from "../data/recitations";

export const PlayerStore = new Store({
  open: true,
  mini: false,
  chapters,
  reciters,
  recitations,
  src: null,
  playing: false,
  playbackRate: 1,
  chapterIndex: 0,
  chapterName: chapters[0].name,
  chapterMeaning: chapters[0].meaning,
  reciterId: 7,
  reciterSlug: "mishary-rashid-alafasy",
  reciterName: reciters[7].reciter_name,
  reciterImage: reciters[7].reciter_image,
  loading: false,
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

export const setPlaying = (isPlaying) => {
  PlayerStore.update((s) => {
    s.playing = isPlaying;
  });
};

export const setChapter = (index) => {
  PlayerStore.update((s) => {
    s.chapterIndex = index;
    s.chapterName = chapters[index].name;
    s.chapterMeaning = chapters[index].meaning;
  });
};

export const setSrc = (reciterId, chapterIndex) => {
  PlayerStore.update((s) => {
    s.src = recitations[reciterId][chapterIndex];
  });
};

export const setReciter = (id) => {
  const filtered = reciters.filter((reciter) => reciter.reciter_id === id);
  const reciter = filtered[0];

  PlayerStore.update((s) => {
    s.reciterId = id;
    s.reciterSlug = reciter.reciter_slug;
    s.reciterName = reciter.reciter_name;
    s.reciterImage = reciter.reciter_image;
  });
};

export const setPlaybackRate = (rate) => {
  PlayerStore.update((s) => {
    s.playbackRate = rate;
  });
};

export const setLoading = (isLoading) => {
  PlayerStore.update((s) => {
    s.loading = isLoading;
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
