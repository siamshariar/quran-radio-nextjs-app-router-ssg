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

const Chapter = ({ index, reciterId, chapterNo }) => {
  const playing = PlayerStore.useState((s) => s.playing);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const chapters = PlayerStore.useState((s) => s.chapters);
  const chapterList = PlayerStore.useState((s) => s.chapterList);
  const reciter = PlayerStore.useState((s) => s.reciter);

  const handleChapterChange = () => {
    return;
    // // setPlayerMini(false);
    // if (
    //   reciterId === reciter.id &&
    //   chapterList[chapterIndex] === chapterNo &&
    //   playing
    // ) {
    //   // setPlaying(false);
    //   return;
    // } else if (playing) {
    //   setChapterList(reciterId);
    //   setChapter(chapterList, index);
    //   setPlaying(true);
    //   // setChapterList(reciterId);
    //   return;
    // } else {
    //   // setReciter(reciter.id);
    //   setChapter(chapterList, index);
    //   setChapterList(reciterId);
    //   setPlaying(true);
    //   return;
    // }
  };

  return (
    <div
      className={classNames(
        styles.card,
        reciterId === reciter.id &&
          chapterList[chapterIndex] === chapterNo &&
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
          {reciterId === reciter.id &&
          chapterList[chapterIndex] === chapterNo &&
          playing ? (
            <ion-icon icon={playCircle} slot="start" class={styles.icon} />
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
