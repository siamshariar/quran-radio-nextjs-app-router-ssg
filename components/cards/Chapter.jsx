import classNames from "classnames";
import { IonIcon } from "@ionic/react";
import { play as playIcon, pause as pauseIcon } from "ionicons/icons";
import { PlayerStore, setPlaying, setChapter } from "../../store";
import styles from "./Chapter.module.css";

const Chapter = ({ chapter }) => {
  const playing = PlayerStore.useState((s) => s.playing);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);

  const handleChapterChange = () => {
    if (chapterIndex == chapter.chapterNo - 1 && playing) {
      setPlaying(false);
    } else if (playing) {
      setChapter(chapter.chapterNo - 1);
    } else {
      setChapter(chapter.chapterNo - 1);
      setPlaying(true);
    }
  };

  return (
    <div
      className={classNames(
        styles.card,
        chapterIndex === chapter.chapterNo - 1 ? styles.active : ""
      )}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.number}>{chapter.chapterNo}</div>
          <div className={styles.name}>{chapter.name}</div>
          <div className={styles.meaning}>{chapter.meaning}</div>
        </div>
        <div className={styles.right}>
          {playing && chapterIndex === chapter.chapterNo - 1 && (
            <div className={styles.btn} onClick={handleChapterChange}>
              <IonIcon icon={pauseIcon} slot="start" className={styles.icon} />
            </div>
          )}
          {(!playing || chapterIndex !== chapter.chapterNo - 1) && (
            <div className={styles.btn} onClick={handleChapterChange}>
              <IonIcon icon={playIcon} slot="start" className={styles.icon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
