import classNames from "classnames";
import {
  PlayerStore,
  setPlaying,
  setReciter,
  setChapter,
  setChapterList,
  setPlayerMini,
  setSrc,
} from "@/store";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";

const Chapter = ({ index, reciter, chapterNo }) => {
  const playing = PlayerStore.useState((s) => s.playing);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const chapters = PlayerStore.useState((s) => s.chapters);
  const currentChapters = PlayerStore.useState((s) => s.chapterList);
  const currentReciter = PlayerStore.useState((s) => s.reciter);
  const loading = PlayerStore.useState((s) => s.loading);

  const handleChapterChange = () => {
    if (
      reciter.id === currentReciter.id &&
      currentChapters[chapterIndex] === chapterNo &&
      playing
    ) {
      setPlaying(false);
      return;
    } else {
      setReciter(reciter.id);
      setChapterList(reciter.id);
      setChapter(reciter.moshaf[0].surah_list.split(","), index);
      setSrc(reciter.moshaf[0].surah_list.split(","), reciter.id, index);
      setPlaying(true);
      return;
    }
  };

  return (
    <div
      className={classNames(
        styles.card,
        reciter.id === currentReciter.id &&
          currentChapters[chapterIndex] === chapterNo &&
          playing
          ? styles.active
          : ""
      )}
    >
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.image}>
            <div className={styles.number}>
              {chapters[chapterNo - 1].chapterNo}
            </div>
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.name}>{chapters[chapterNo - 1].name}</div>
          <div className={styles.meaning}>
            {chapters[chapterNo - 1].meaning}
          </div>
        </div>

        <div className={styles.right}>
          {reciter.id === currentReciter.id &&
          currentChapters[chapterIndex] === chapterNo &&
          playing ? (
            <ion-icon
              icon={playCircle}
              slot="start"
              class={styles.icon}
              onClick={() => handleChapterChange()}
            />
          ) : (
            <ion-icon
              icon={pauseCircle}
              slot="start"
              class={styles.icon}
              onClick={() => handleChapterChange()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
