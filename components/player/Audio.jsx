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
  setChapterList,
} from "@/store";
import { LocalStore } from "@/store/local";
import { useRecentStorage } from "@/hooks/useRecentStorage";

const AudioTag = () => {
  const audioRef = useRef(null);
  const reciters = PlayerStore.useState((s) => s.reciters);
  const src = PlayerStore.useState((s) => s.src);
  const playing = PlayerStore.useState((s) => s.playing);
  const playbackRate = LocalStore.useState((s) => s.settings.playbackRate);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const loading = PlayerStore.useState((s) => s.loading);
  const currentTime = PlayerStore.useState((s) => s.currentTime);
  const isProgress = PlayerStore.useState((s) => s.isProgress);
  const chapterList = PlayerStore.useState((s) => s.chapterList);
  const loop = PlayerStore.useState((s) => s.loop);

  // to prevent the play request was interrupted by a call to pause error
  const playAudio = () => {
    if (loading) return;
    setLoading(true);
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setLoading(false);
        setPlaying(true);
      });
    }
  };

  const pauseAudio = () => {
    if (loading) return;
    audioRef.current.pause();
  };

  const handleEnd = () => {
    let index;
    if (loop) {
      setCurrentTime(0);
      audioRef.current.play();
      return;
      // index = chapterIndex;
    } else {
      index = chapterIndex + 1;
    }
    if (index >= chapterList.length) {
      setPlaying(false);
      setChapter(chapterList, 0);
      setSrc(chapterList, reciterId, 0);
      return;
    } else {
      setChapter(chapterList, index);
      setSrc(chapterList, reciterId, index);
      setPlaying(true);
      return;
    }
  };

  useEffect(() => {
    const randomReciterIndex = Math.floor(Math.random() * reciters.length);
    const randomReciter = reciters[randomReciterIndex];
    const randomReciterId = randomReciter.id;
    const randomChapterList = randomReciter.moshaf[0].surah_list.split(",");
    const randomChapterIndex = Math.floor(
      Math.random() * randomChapterList.length
    );

    setReciter(randomReciterId);
    setChapterList(randomReciterId);
    setChapter(randomChapterList, randomChapterIndex);
  }, []);

  useEffect(() => {
    setSrc(chapterList, reciterId, chapterIndex);
  }, [chapterList, reciterId, chapterIndex]);

  useEffect(() => {
    if (playing) {
      playAudio();
      audioRef.current.playbackRate = playbackRate;
    } else {
      pauseAudio();
    }
    // console.log(chapterIndex, playing, src);
  }, [playing, src, playbackRate]);

  useEffect(() => {
    if (isProgress) {
      audioRef.current.currentTime = currentTime;
    }
  }, [isProgress]);

  // add to recently played
  const { addRecent } = useRecentStorage();
  useEffect(() => {
    if (playing) {
      addRecent(reciterId, chapterIndex);
    }
  }, [playing, reciterId, chapterIndex]);

  return (
    <audio
      style={{ visibility: "hidden" }}
      ref={audioRef}
      // className={styles.audio}
      controls={false}
      src={src}
      onEnded={handleEnd}
      onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
      onCanPlay={(e) => setDur(e.target.duration)}
    ></audio>
  );
};

export default AudioTag;
