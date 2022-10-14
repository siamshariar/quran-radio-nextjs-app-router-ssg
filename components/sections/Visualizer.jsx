import { PlayerStore, setCurrentTime, setIsProgress } from "../../store";
import styles from "./Visualizer.module.css";

const Visualizer = () => {
  const currentTime = PlayerStore.useState((s) => s.currentTime);
  const dur = PlayerStore.useState((s) => s.dur);

  const formatDur = (s) => {
    return (s - (s %= 60)) / 60 + (s < 10 ? ":0" : ":") + ~~s;
  };

  const handleProgress = (progress) => {
    setIsProgress(false);
    let compute = (progress * dur) / 100;
    setCurrentTime(compute);
    setTimeout(() => {
      setIsProgress(true);
    }, 1);
  };

  return (
    <div className={styles.root}>
      <div className={styles.duration}>
        <div className={styles.start}>{formatDur(currentTime)}</div>
        <div className={styles.end}>{formatDur(dur)}</div>
      </div>

      <div className={styles.progress}>
        <div
          className={styles.label}
          style={{ width: `${dur ? (currentTime * 100) / dur : 0}%` }}
        ></div>
        <input
          type="range"
          min="0"
          max="100"
          value={dur ? (currentTime * 100) / dur : 0}
          onChange={(e) => handleProgress(e.target.value)}
          name="progresBar"
        />
      </div>
    </div>
  );
};

export default Visualizer;
