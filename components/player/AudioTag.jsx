const AudioTag = () => {
  return (
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
  );
};
