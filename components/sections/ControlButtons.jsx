import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import {
  // play as playIcon,
  pause as pauseIcon,
  // playSkipForward as playNextIcon,
  // playSkipBack as playPreviousIcon,
  // shuffleOutline as shuffleIcon,
  // repeatOutline as repeatIcon,
} from "ionicons/icons";

import {playOutline as playIcon, nextOutline as playNextIcon, previousOutline as playPreviousIcon, repeat as repeatIcon, shuffle as shuffleIcon} from '../../icons'

import { PlayerStore, setChapter, setSrc, setPlaying } from "../../store";
import Loader from "../utils/Loader";
import styles from "./ControlButtons.module.css";

const ControlButtons = () => {
  const playing = PlayerStore.useState((s) => s.playing);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const loading = PlayerStore.useState((s) => s.loading);

  const play = () => {
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  const playPrevious = () => {
    if (loading) return;
    const index = chapterIndex - 1;
    if (index < 0) return;
    setChapter(index);
    setSrc(reciterId, index);
    setPlaying(true);
  };

  const playNext = () => {
    if (loading) return;
    const index = chapterIndex + 1;
    if (index >= 114) return;
    setChapter(index);
    setSrc(reciterId, index);
    setPlaying(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div
          className={classNames(styles.btn, styles.small)}
          // onClick={playPrevious}
        >
          <IonIcon icon={shuffleIcon} slot="start" className={styles.icon} />
        </div>

        <div
          className={classNames(styles.btn, styles.small, styles.shadow)}
          onClick={playPrevious}
        >
          <IonIcon
            icon={playPreviousIcon}
            slot="start"
            className={styles.icon}
          />
        </div>

        {playing && (
          <div
            className={classNames(
              styles.btn,
              styles.large,
              styles.shadow,
              styles.play
            )}
            onClick={pause}
          >
            {loading && <Loader />}
            {!loading && (
              <IonIcon icon={pauseIcon} slot="start" className={styles.icon} />
            )}
          </div>
        )}

        {!playing && (
          <div
            className={classNames(
              styles.btn,
              styles.large,
              styles.shadow,
              styles.play
            )}
            onClick={play}
          >
            {loading && <Loader />}
            {!loading && (
              <IonIcon icon={playIcon} slot="start" className={styles.icon} />
            )}
          </div>
        )}

        <div
          className={classNames(styles.btn, styles.small, styles.shadow)}
          onClick={playNext}
        >
          <IonIcon icon={playNextIcon} slot="start" className={styles.icon} />
        </div>

        <div
          className={classNames(styles.btn, styles.small)}
          // onClick={playNext}
        >
          <IonIcon icon={repeatIcon} slot="start" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default ControlButtons;
