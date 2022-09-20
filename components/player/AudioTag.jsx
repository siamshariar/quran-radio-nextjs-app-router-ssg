import { useEffect, useRef } from "react";
import {
  PlayerStore,
  setChapter,
  setSrc,
  setPlaying,
  setReciter,
  setLoading,
  setCurrentTime,
  setDur,
} from "../../store";

const AudioTag = () => {
  const audio = useRef(null);

  const reciters = PlayerStore.useState((s) => s.reciters);
  const src = PlayerStore.useState((s) => s.src);
  const playing = PlayerStore.useState((s) => s.playing);
  const playbackRate = PlayerStore.useState((s) => s.playbackRate);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const loading = PlayerStore.useState((s) => s.loading);
  const currentTime = PlayerStore.useState((s) => s.currentTime);
  const isProgress = PlayerStore.useState((s) => s.isProgress);

  // to prevent the play request was interrupted by a call to pause error
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

  useEffect(() => {
    const randomChapterIndex = Math.floor(Math.random() * 114);
    const randomReciterIndex = Math.floor(Math.random() * reciters.length);
    const randomReciterId = reciters[randomReciterIndex].reciter_id;
    setReciter(randomReciterId);
    setChapter(randomChapterIndex);
  }, []);

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

  useEffect(() => {
    if (isProgress) {
      audio.current.currentTime = currentTime;
    }
  }, [isProgress]);

  return (
    <audio
      style={{ visibility: "hidden" }}
      ref={audio}
      // className={styles.audio}
      controls={false}
      src={src}
      onEnded={handleEnd}
      onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
      onCanPlay={(e) => setDur(e.target.duration)}
    >
      {/* <source src={src} type="audio/mpeg" /> */}
    </audio>
  );
};

export default AudioTag;
