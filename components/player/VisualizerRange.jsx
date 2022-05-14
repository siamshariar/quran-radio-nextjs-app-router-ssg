import styles from "./Visualizer.module.css";

const Visualizer = ({ dur, updateDur, isMini }) => {
  return (
    <input
      className={`${styles.progress} ${isMini ? styles.mini : ""}`}
      type="range"
      min="0"
      max="100"
      value={dur}
      onChange={(e) => updateDur(e.target.value)}
      name="progresBar"
    />
  );
};

export default Visualizer;
