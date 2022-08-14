import { useEffect, useRef } from "react";

import classNames from "classnames";
import styles from "./ModalSetTimer.module.css";

const ModalSetTimer = ({ open, handler }) => {
  const hourRef = useRef(null);
  const modalRef = useRef(null);

  var lastDegree = 0; //degree when mousedown ended
  var currentDegree = 0; //current degree as mouse moves
  // var aElem=$(".a")[0]; //element
  var startDragDegree; //degree when mousedown started

  function closeDragElement() {
    lastDegree = currentDegree;
    document.addEventListener("touchend", null);
    document.addEventListener("touchmove", null);
    // document.onmouseup = null;
    // document.onmousemove = null;
  }

  function findCenter(elem) {
    //find center of element
    var x = elem.offsetLeft + elem.offsetWidth / 2;
    var y = elem.offsetTop + elem.offsetHeight / 2;
    return { x, y };
  }

  function rotateOnMouse(e, pw) {
    var center = findCenter(pw);
    var mouse = { x: e.pageX, y: e.pageY };
    var radians = Math.atan2(mouse.x - center.x, mouse.y - center.y);
    var currentMouseDegree = radians * (180 / Math.PI) * -1;
    currentDegree = currentMouseDegree - startDragDegree + lastDegree;
    pw.style.transform = "rotate(" + currentDegree + "deg)";

    // $(pw).css({
    //   "-moz-transform": "rotate(" + currentDegree + "deg)",
    //   "-webkit-transform": "rotate(" + currentDegree + "deg)",
    //   "-o-transform": "rotate(" + currentDegree + "deg)",
    //   "-ms-transform": "rotate(" + currentDegree + "deg)",
    // });
  }

  useEffect(() => {
    hourRef.current.addEventListener("touchstart", (e) => {
      e.preventDefault();
      var mouseInitial = { x: e.pageX, y: e.pageY };
      var center = findCenter(hourRef.current);
      var radians = Math.atan2(
        mouseInitial.x - center.x,
        mouseInitial.y - center.y
      );
      startDragDegree = radians * (180 / Math.PI) * -1;
    });

    document.body.addEventListener("touchmove", (e2) => {
      rotateOnMouse(e2, hourRef.current);
      console.log("moving");
    });

    document.body.addEventListener("touchend", closeDragElement);
  }, []);

  return (
    <>
      <div
        className={classNames(styles.modal, open ? styles.open : "")}
        ref={modalRef}
      >
        <div className={styles.backdrop} onClick={() => handler(false)}></div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.title}>Timer</div>
          </div>
          <div className={styles.timer}>
            <div className={styles.hour} ref={hourRef}>
              <div className={styles.h_bullet}></div>
            </div>

            <div className={styles.minute}>
              <div className={styles.m_bullet}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSetTimer;
