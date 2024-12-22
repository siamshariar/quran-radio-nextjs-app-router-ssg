import React from "react";
import { PlayerStore } from "../../store"; 
import styles from "./Tune.module.css"; 

const Tune = () => {
  const playing = PlayerStore.useState((s) => s.playing); 

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <div
          className={`${styles.visualize} ${playing ? styles.playing : styles.notPlaying}`}
        >
          <span className={`${styles.spike} ${styles.spike1}`}></span>
          <span className={`${styles.spike} ${styles.spike2}`}></span>
          <span className={`${styles.spike} ${styles.spike3}`}></span>
          <span className={`${styles.spike} ${styles.spike4}`}></span>
          <span className={`${styles.spike} ${styles.spike5}`}></span>
          <span className={`${styles.spike} ${styles.spike6}`}></span>
          <span className={`${styles.spike} ${styles.spike7}`}></span>
        </div>
      </div>
      <div className={styles.outer}></div>
      <div className={styles.subtract}></div>
      <div className={styles.inner}>
        <div className={styles.el3}></div>
        <div className={styles.el2}></div>
        <div className={styles.el1}></div>
      </div>
    </div>
  );
};

export default Tune;