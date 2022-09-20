import classNames from "classnames";
import { IonIcon, IonRouterLink } from "@ionic/react";
import { play as playIcon, pause as pauseIcon } from "ionicons/icons";
import {
  PlayerStore,
  setPlaying,
  setChapter,
  setPlayerMini,
} from "../../store";
import styles from "./Chapter.module.css";

const Chapter = ({ chapter }) => {
  const playing = PlayerStore.useState((s) => s.playing);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);

  const handleChapterChange = () => {
    setPlayerMini(false);
    if (chapterIndex == chapter.chapterNo - 1 && playing) {
      // setPlaying(false);
      return;
    } else if (playing) {
      setChapter(chapter.chapterNo - 1);
      return;
    } else {
      setChapter(chapter.chapterNo - 1);
      setPlaying(true);
      return;
    }
  };

  return (
    <div
      className={classNames(
        styles.card,
        chapterIndex === chapter.chapterNo - 1 ? styles.active : ""
      )}
    >
      <IonRouterLink
        className={styles.link}
        onClick={() => handleChapterChange()}
        routerLink="/"
      >
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.number}>{chapter.chapterNo}</div>
            <div className={styles.name}>{chapter.name}</div>
            <div className={styles.meaning}>{chapter.meaning}</div>
          </div>
          {/* <div className={styles.right}>
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
        </div> */}
        </div>
      </IonRouterLink>
    </div>
  );
};

export default Chapter;
