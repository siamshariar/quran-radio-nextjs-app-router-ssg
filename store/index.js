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
  chapterIndex: 0,
  reciterId: 7,
  playing: false,
  playbackRate: 1,
  // safeAreaTop: 0,
  // safeAreaBottom: 0,
  // menuOpen: false,
  // notificationsOpen: false,
  // currentPage: null,
  // homeItems,
  // lists,
  // notifications,
  // settings: {
  //   enableNotifications: true,
  // },
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

export const setChapterIndex = (index) => {
  PlayerStore.update((s) => {
    s.chapterIndex = index;
  });
};

export const setReciterId = (id) => {
  PlayerStore.update((s) => {
    s.reciterId = id;
  });
};

export const setPlaybackRate = (rate) => {
  PlayerStore.update((s) => {
    s.playbackRate = rate;
  });
};
