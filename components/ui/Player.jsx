import styles from "./Player.module.css";
import { useState, useEffect, useRef } from "react";
import Visualizer from "../utils/Visualizer";

import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";

import {
  play as playIcon,
  pause as pauseIcon,
  playSkipForward as playNextIcon,
  playSkipBack as playPreviousIcon,
  ellipsisVertical as vertIcon,
} from "ionicons/icons";

const Player = ({
  playing,
  setPlaying,
  chapterIndex,
  setChapterIndex,
  src,
}) => {
  const audio = useRef(null);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const formatDur = (s) => {
    return (s - (s %= 60)) / 60 + (s < 10 ? ":0" : ":") + ~~s;
  };

  useEffect(() => {
    if (playing) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [src, playing]);

  const play = () => {
    setPlaying(true);
    // setEnded(false);
    // setInit(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  const playPrevious = () => {
    const index = chapterIndex - 1;
    if (index < 0) {
      // pause();
      return;
    }
    setChapterIndex(index);
    setPlaying(true);
  };

  const playNext = () => {
    const index = chapterIndex + 1;
    if (index >= 114) return;
    setChapterIndex(index);
    setPlaying(true);
  };

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  };

  const handleEnd = () => {
    const index = chapterIndex + 1;
    if (index >= 114) {
      setPlaying(false);
      // setEnded(true);
      setChapterIndex(0);
      return;
    }
    setChapterIndex(index);
    setPlaying(true);
  };

  const controllerRef = useRef(null);
  const [buttonsOpen, setButtonsOpen] = useState(false);

  const handleButtonModal = (e, open) => {
    e.stopPropagation();
    setButtonsOpen(open);
  };

  const setPlaybackSpeed = (speed) => {
    audio.current.playbackRate = speed;
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target == controllerRef.current) return;
      setButtonsOpen(false);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}>
        <div className={styles.start}>{formatDur(currentTime)}</div>

        {/* <Visualizer playing={playing} setPlaying={setPlaying} /> */}

        <input
          className={styles.progress}
          type="range"
          min="0"
          max="100"
          value={dur ? (currentTime * 100) / dur : 0}
          onChange={(e) => handleProgress(e)}
          name="progresBar"
        />

        <div className={styles.end}>{formatDur(dur)}</div>

        <div className={styles.controller} ref={controllerRef}>
          <div
            className={styles.ctrl_btn}
            onClick={(e) => handleButtonModal(e, true)}
          >
            <IonIcon icon={vertIcon} className={styles.ctrl_icon} />
          </div>

          <div
            className={`${styles.modal} ${buttonsOpen ? styles.open : ""}`}
            onClick={(e) => handleButtonModal(e, false)}
          >
            <div className={styles.playback}>
              <button onClick={() => setPlaybackSpeed(0.25)}>0.25</button>
              <button onClick={() => setPlaybackSpeed(0.5)}>0.5</button>
              <button onClick={() => setPlaybackSpeed(0.75)}>0.75</button>
              <button onClick={() => setPlaybackSpeed(1)}>Normal</button>
              <button onClick={() => setPlaybackSpeed(1.25)}>1.25</button>
              <button onClick={() => setPlaybackSpeed(1.5)}>1.5</button>
              <button onClick={() => setPlaybackSpeed(1.75)}>1.75</button>
              <button onClick={() => setPlaybackSpeed(2)}>2</button>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audio}
        className={styles.audio}
        controls={false}
        src={src}
        onEnded={handleEnd}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDur(e.target.duration)}
      >
        {/* <source src={src} type="audio/mpeg" /> */}
      </audio>

      <div className={styles.controls}>
        <div className={`${styles.btn} ${styles.small}`} onClick={playPrevious}>
          <IonIcon icon={playPreviousIcon} className={styles.icon} />
        </div>

        {playing && (
          <div className={`${styles.btn} ${styles.large}`} onClick={pause}>
            <IonIcon icon={pauseIcon} className={styles.icon} />
          </div>
        )}

        {!playing && (
          <div className={`${styles.btn} ${styles.large}`} onClick={play}>
            <IonIcon icon={playIcon} className={styles.icon} />
          </div>
        )}

        <div className={`${styles.btn} ${styles.small}`} onClick={playNext}>
          <IonIcon icon={playNextIcon} className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Player;
