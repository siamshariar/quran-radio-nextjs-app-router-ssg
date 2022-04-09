import Store from ".";

export const setMenuOpen = (open) => {
  Store.update((s) => {
    s.menuOpen = open;
  });
};

export const setNotificationsOpen = (open) => {
  Store.update((s) => {
    s.notificationsOpen = open;
  });
};

export const setSettings = (settings) => {
  Store.update((s) => {
    s.settings = settings;
  });
};

// App-specific actions

export const setDone = (list, item, done) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex((l) => l === list);
    const itemIndex = o.lists[listIndex].items.findIndex((i) => i === item);
    s.lists[listIndex].items[itemIndex].done = done;
    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
};

// player actions
export const playPrevious = () => {
  // const index = currentIndex - 1;
  // if (audioType === "chapter" || index < 0) return;
  // //if (index < 0) return
  // setCurrentIndex(index);
  // setSrc(playlist[index]);
  // scrollToVerse(index);
  // setPlaying(true);

  const index = chapterIndex - 1;
  if (index < 0) {
    // pause();
    return;
  }
  setSrc(`${recitations[reciterId][index]}`);
  setChapterIndex(index);
  //if (index < 0) return
  setPlaying(true);
};

export const playNext = () => {
  const index = chapterIndex + 1;
  if (index == chapters.length) return;
  setChapterIndex(index);
  setSrc(`${recitations[reciterId][index]}`);
  setPlaying(true);
};

export const handleEnd = () => {
  // if (audioType === "chapter") {
  //   setPlaying(false);
  //   setEnded(true);
  //   setCurrentIndex(0);
  //   return;
  // }

  const index = chapterIndex + 1;

  if (index == chapters.length) {
    setPlaying(false);
    setEnded(true);
    setChapterIndex(0);
    return;
  }

  setChapterIndex(index);
  setSrc(`${recitations[reciterId][index]}`);
  setPlaying(true);
  // scrollToVerse(index);
};
