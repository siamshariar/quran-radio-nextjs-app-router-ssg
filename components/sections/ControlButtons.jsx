import classNames from "classnames";
import {
  playOutline as playIcon,
  pauseOutline as pauseIcon,
  nextOutline as playNextIcon,
  previousOutline as playPreviousIcon,
  repeat as repeatIcon,
  shuffle as shuffleIcon,
} from "@/icons";
import { PlayerStore, setChapter, setSrc, setPlaying, setLoop } from "@/store";
import Loader from "../utils/Loader";
import styles from "./ControlButtons.module.css";

const ControlButtons = () => {
  const playing = PlayerStore.useState((s) => s.playing);
  const currentChapters = PlayerStore.useState((s) => s.chapterList);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const loading = PlayerStore.useState((s) => s.loading);
  const loop = PlayerStore.useState((s) => s.loop);

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
    setChapter(currentChapters, index);
    setSrc(currentChapters, reciterId, index);
    setPlaying(true);
  };

  const playNext = () => {
    if (loading) return;
    const index = chapterIndex + 1;
    if (index >= currentChapters.length) return;
    setChapter(currentChapters, index);
    setSrc(currentChapters, reciterId, index);
    setPlaying(true);
  };

  const handleRepeat = () => {
    setLoop(!loop);
    return;
  };

  const handleShuffle = () => {
    return;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div
          className={classNames(
            styles.btn,
            styles.small,
            loop ? styles.loop : ""
          )}
          onClick={handleRepeat}
        >
          <ion-icon icon={repeatIcon} slot="start" class={styles.icon} />
        </div>

        <div
          className={classNames(styles.btn, styles.small, styles.shadow)}
          onClick={playPrevious}
        >
          <ion-icon icon={playPreviousIcon} slot="start" class={styles.icon} />
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
              <ion-icon icon={playIcon} slot="start" class={styles.icon} />
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
              <ion-icon icon={pauseIcon} slot="start" class={styles.icon} />
            )}
          </div>
        )}

        <div
          className={classNames(styles.btn, styles.small, styles.shadow)}
          onClick={playNext}
        >
          <ion-icon icon={playNextIcon} slot="start" class={styles.icon} />
        </div>

        <div
          className={classNames(styles.btn, styles.small)}
          onClick={handleShuffle}
        >
          <ion-icon icon={shuffleIcon} slot="start" class={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default ControlButtons;
