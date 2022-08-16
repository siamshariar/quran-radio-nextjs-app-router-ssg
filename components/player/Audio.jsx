import { useState, useEffect, useRef } from "react";
import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import {
  play as playIcon,
  pause as pauseIcon,
  playSkipForward as playNextIcon,
  playSkipBack as playPreviousIcon,
  ellipsisVertical as vertIcon,
  shuffleOutline as shuffleIcon,
  repeatOutline as repeatIcon,
} from "ionicons/icons";
import {
  PlayerStore,
  setChapter,
  setSrc,
  setPlaying,
  setPlaybackRate,
} from "../../store";
import Visualizer from "./VisualizerRange";
import Loader from "../utils/Loader";
import styles from "./Audio.module.css";

const Player = () => {
  const audio = useRef(null);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const src = PlayerStore.useState((s) => s.src);
  const playing = PlayerStore.useState((s) => s.playing);
  const playbackRate = PlayerStore.useState((s) => s.playbackRate);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const reciterId = PlayerStore.useState((s) => s.reciterId);

  // to prevent the play request was interrupted by a call to pause error
  const [loading, setLoading] = useState(false);

  const playAudio = () => {
    if (loading) return;
    setLoading(true);
    const playPromise = audio.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setLoading(false);
        setPlaying(true);
      });
    }
  };

  const pauseAudio = () => {
    if (loading) return;
    audio.current.pause();
  };

  const formatDur = (s) => {
    return (s - (s %= 60)) / 60 + (s < 10 ? ":0" : ":") + ~~s;
  };

  useEffect(() => {
    setSrc(reciterId, chapterIndex);
  }, [reciterId, chapterIndex]);

  useEffect(() => {
    if (playing) {
      playAudio();
      audio.current.playbackRate = playbackRate;
    } else {
      pauseAudio();
    }
    // console.log(chapterIndex, playing, src);
  }, [playing, src, playbackRate]);

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

  const handleProgress = (progress) => {
    let compute = (progress * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  };

  const handleEnd = () => {
    const index = chapterIndex + 1;
    if (index >= 114) {
      setPlaying(false);
      setChapter(0);
      setSrc(reciterId, 0);
      return;
    }
    setChapter(index);
    setSrc(reciterId, index);
    setPlaying(true);
  };

  const setPlaybackSpeed = (rate) => {
    setPlaybackRate(rate);
  };

  const controllerRef = useRef(null);
  const [buttonsOpen, setButtonsOpen] = useState(false);

  const handleButtonModal = (e, open) => {
    e.stopPropagation();
    setButtonsOpen(open);
  };

  useEffect(() => {
    const handleOpen = (e) => {
      if (e.target === controllerRef.current) return;
      setButtonsOpen(false);
    };
    document.body.addEventListener("click", handleOpen);
    return () => {
      document.body.removeEventListener("click", handleOpen);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}>
        <div className={styles.start}>{formatDur(currentTime)}</div>

        <Visualizer
          dur={dur ? (currentTime * 100) / dur : 0}
          updateDur={handleProgress}
        />

        <div className={styles.end}>{formatDur(dur)}</div>

        <div className={styles.controller} ref={controllerRef}>
          <div
            className={styles.ctrl_btn}
            onClick={(e) => handleButtonModal(e, true)}
          >
            <IonIcon
              icon={vertIcon}
              slot="start"
              className={styles.ctrl_icon}
            />
          </div>

          <div
            className={classNames(styles.modal, buttonsOpen ? styles.open : "")}
            onClick={(e) => handleButtonModal(e, false)}
          >
            <div className={styles.playback}>
              <button
                className={playbackRate === 0.25 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(0.25)}
              >
                0.25
              </button>
              <button
                className={playbackRate === 0.5 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(0.5)}
              >
                0.5
              </button>
              <button
                className={playbackRate === 0.75 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(0.75)}
              >
                0.75
              </button>
              <button
                className={playbackRate === 1 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(1)}
              >
                Normal
              </button>
              <button
                className={playbackRate === 1.25 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(1.25)}
              >
                1.25
              </button>
              <button
                className={playbackRate === 1.5 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(1.5)}
              >
                1.5
              </button>
              <button
                className={playbackRate === 1.75 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(1.75)}
              >
                1.75
              </button>
              <button
                className={playbackRate === 2 ? styles.active : ""}
                onClick={() => setPlaybackSpeed(2)}
              >
                2
              </button>
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
        <div
          className={classNames(styles.btn, styles.small)}
          // onClick={playPrevious}
        >
          <IonIcon icon={shuffleIcon} slot="start" className={styles.icon} />
        </div>

        <div
          className={classNames(styles.btn, styles.small)}
          onClick={playPrevious}
        >
          <IonIcon
            icon={playPreviousIcon}
            slot="start"
            className={styles.icon}
          />
        </div>

        {playing && (
          <div className={classNames(styles.btn, styles.large)} onClick={pause}>
            {loading && <Loader />}
            {!loading && (
              <IonIcon icon={pauseIcon} slot="start" className={styles.icon} />
            )}
          </div>
        )}

        {!playing && (
          <div className={classNames(styles.btn, styles.large)} onClick={play}>
            {loading && <Loader />}
            {!loading && (
              <IonIcon icon={playIcon} slot="start" className={styles.icon} />
            )}
          </div>
        )}

        <div
          className={classNames(styles.btn, styles.small)}
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

export default Player;
