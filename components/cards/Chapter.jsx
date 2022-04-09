import styles from "./Chapter.module.css";
import { IonIcon } from "@ionic/react";
import { play as playIcon, pause as pauseIcon } from "ionicons/icons";

const Chapter = ({
  chapter,
  playing,
  setPlaying,
  chapterIndex,
  setChapterIndex,
}) => {
  const handleChapterChange = () => {
    if (chapterIndex == chapter.chapterNo - 1 && playing) {
      setPlaying(false);
    } else if (playing) {
      setChapterIndex(chapter.chapterNo - 1);
    } else {
      setChapterIndex(chapter.chapterNo - 1);
      setPlaying(true);
    }
  };

  return (
    <div
      className={
        chapterIndex === chapter.chapterNo - 1
          ? `${styles.card} ${styles.active}`
          : styles.card
      }
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.number}>{chapter.chapterNo}</div>
          <div className={styles.name}>{chapter.name}</div>
          <div className={styles.meaning}>{chapter.meaning}</div>
        </div>
        <div className={styles.right}>
          {playing && chapterIndex === chapter.chapterNo - 1 && (
            <div className={styles.btn} onClick={() => handleChapterChange()}>
              <IonIcon icon={pauseIcon} className={styles.icon} />
            </div>
          )}
          {(!playing || chapterIndex !== chapter.chapterNo - 1) && (
            <div className={styles.btn} onClick={() => handleChapterChange()}>
              <IonIcon icon={playIcon} className={styles.icon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
