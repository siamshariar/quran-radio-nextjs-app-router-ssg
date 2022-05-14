import styles from "./Visualizer.module.css";
import { useEffect } from "react";
import { coordinates } from "./v_coordinates";

const Visualizer = ({ dur, updateDur, isMini }) => {
  const drawCanvas = (canvas, color) => {
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let i = 0; i < coordinates.length; i++) {
      ctx.moveTo(coordinates[i][0], coordinates[i][1]);
      ctx.lineTo(coordinates[i][0], 100 - coordinates[i][1]);
    }

    ctx.stroke();
  };

  useEffect(() => {
    let c_inner = document.getElementById("canvas_inner");
    var c_outer = document.getElementById("canvas_outer");
    drawCanvas(c_inner, "#A7ABBF");
    drawCanvas(c_outer, "#F85254");
  }, []);

  const handleDur = (e) => {
    let targetRect = e.target.getBoundingClientRect();
    let x = e.clientX - targetRect.left;
    updateDur((x / 160) * 100);
  };

  return (
    <div className={`${styles.wave} ${isMini ? styles.mini : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <canvas id="canvas_inner" className={styles.canvas}></canvas>
        </div>
        <div className={styles.outer} style={{ width: (dur * 160) / 100 }}>
          <canvas id="canvas_outer" className={styles.canvas}></canvas>
        </div>
        <div className={styles.ranger} onClick={(e) => handleDur(e)}></div>
      </div>
    </div>
  );
};

export default Visualizer;
