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
  reciterName: reciters[7].reciter_name,
  reciterImage: reciters[7].reciter_image,
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
  PlayerStore.update((s) => {
    s.reciterId = id;
    s.reciterName = reciters[id].reciter_name;
    s.reciterImage = reciters[id].reciter_image;
  });
};

export const setPlaybackRate = (rate) => {
  PlayerStore.update((s) => {
    s.playbackRate = rate;
  });
};
