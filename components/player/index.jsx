import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  PlayerStore,
  setPlayerOpen,
  setPlayerMini,
  setPlaying,
} from "../../store";

import Header from "./Header";
import Content from "./Content";
import Audio from "./Audio";
import AudioMini from "./AudioMini";
import AudioMiniMenu from "./AudioMiniMenu";
import Timer from "./Timer";
import AudioTag from "./AudioTag";
import styles from "./index.module.css";

const Player = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const [mostTranslate, setMostTranslate] = useState(1);

  const [translate, setTranslate] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [tempCurrentY, setTempCurrentY] = useState(0);

  const isPlayerOpen = PlayerStore.useState((s) => s.open);
  const isPlayerMini = PlayerStore.useState((s) => s.mini);

  const panelRef = useRef(null);
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const miniMenuRef = useRef(null);

  const location = useLocation();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    // setPanelHeight(panelRef.current.offsetHeight);
    // setMostTranslate(panelRef.current.offsetHeight - 72);
    setPanelHeight(window.innerHeight);
    setMostTranslate(window.innerHeight - 72);
    setTranslate(
      path === "/"
        ? 2 * window.innerHeight
        : isPlayerMini
        ? window.innerHeight - 72
        : window.innerHeight - 72
    );
  }, [path]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setPanelHeight(window.innerHeight);
      setMostTranslate(window.innerHeight - 72);
      setTranslate(isPlayerMini ? window.innerHeight - 72 : 0);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlayerMini]);

  const handleTouchStart = (event) => {
    // if (isPlayerMini) {
    //   setTranslate(window.innerHeight - 72);
    // } else {
    //   setTranslate(0);
    // }

    // containerRef.current.style.transform = `translateY(${translate}px)`;
    // backdropRef.current.style.opacity =
    //   1 - translate / panelRef.current.offsetHeight;

    setCurrentY(windowHeight - event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    setTempCurrentY(currentY);
    setCurrentY(windowHeight - event.touches[0].clientY);

    if (
      translate + tempCurrentY - currentY > 0 &&
      translate + tempCurrentY - currentY < mostTranslate
    ) {
      setTranslate(translate + tempCurrentY - currentY);
    }
    // containerRef.current.style.transform = `translateY(${translate}px)`;
    // backdropRef.current.style.opacity = 1 - translate / panelHeight;
  };

  const handleTouchEnd = () => {
    if (translate > panelHeight / 3) {
      containerRef.current.style.transition = `transform 250ms ease`;
      backdropRef.current.style.transition = `opacity 250ms ease`;
      setTranslate(mostTranslate);
      // handleMini(true);
      // handleOpen(true);

      // containerRef.current.style.transform = `translateY(100%)`;
      // backdropRef.current.style.opacity = 0;

      setTimeout(() => {
        // translate = 0;
        // setTranslate(windowHeight - 72);
        // setTranslate(mostTranslate);
        containerRef.current.style.transition = "unset";
        backdropRef.current.style.transition = "unset";
        // containerRef.current.style.transform = `translateY(0px)`;
        // backdropRef.current.style.opacity = 1;
      }, 250);
    } else {
      // handleOpen(true);
      // handleMini(false);
      containerRef.current.style.transition = `transform 250ms ease`;
      backdropRef.current.style.transition = `opacity 250ms ease`;
      setTranslate(0);
      // handleMini(false);

      // containerRef.current.style.transform = `translateY(0px)`;
      // backdropRef.current.style.opacity = 1;

      setTimeout(() => {
        // setTranslate(0);
        // translate = window.innerHeight - 72;
        containerRef.current.style.transition = "unset";
        backdropRef.current.style.transition = "unset";
      }, 250);
    }
  };

  // useEffect(() => {
  //   const headerInstance = headerRef.current;

  //   headerInstance.addEventListener("touchstart", handleTouchStart);
  //   headerInstance.addEventListener("touchmove", handleTouchMove);
  //   headerInstance.addEventListener("touchend", handleTouchEnd);

  //   return () => {
  //     headerInstance.removeEventListener("touchstart", handleTouchStart);
  //     headerInstance.removeEventListener("touchmove", handleTouchMove);
  //     headerInstance.removeEventListener("touchend", handleTouchEnd);
  //   };
  // }, []);

  useEffect(() => {
    containerRef.current.style.transform = `translateY(${translate}px)`;
    backdropRef.current.style.opacity = 1 - translate / mostTranslate;

    if (translate < mostTranslate - 90) {
      miniMenuRef.current.style.visibility = "hidden";
      miniMenuRef.current.style.opacity = 0;
    } else {
      miniMenuRef.current.style.visibility = "visible";
      miniMenuRef.current.style.opacity = 1 - (mostTranslate - translate) / 90;
    }

    if (translate < mostTranslate) {
      setPlayerMini(false);
    } else {
      setPlayerMini(true);
    }
  }, [translate, panelHeight, windowHeight]);

  useEffect(() => {
    isPlayerMini
      ? (backdropRef.current.style.display = "none")
      : (backdropRef.current.style.display = "block");
  }, [isPlayerMini]);

  const [dialogOpen, setDialogOpen] = useState(true);
  const handleDialog = () => {
    setDialogOpen(false);
    setPlaying(true);
  };

  return (
    <>
      <div className={classNames(styles.dialog, dialogOpen ? styles.open : "")}>
        <div className={styles.dialog_content}>
          <div className={styles.dialog_text}>Start listening</div>
          <div className={styles.dialog_btn}>
            <button onClick={() => handleDialog()}>Start</button>
          </div>
        </div>
      </div>

      <div className={styles.backdrop} ref={backdropRef}></div>

      <div className={styles.panel_container} ref={containerRef}>
        <div
          className={styles.audio_mini}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AudioMini />
        </div>

        <div className={styles.mini_menu} ref={miniMenuRef}>
          <AudioMiniMenu />
        </div>

        <div
          className={styles.panel_header}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        ></div>

        <div className={styles.panel_content}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <Header />
            </div>
            <div className={styles.content}>
              <Content />
            </div>
            <div className={styles.timer}>
              <Timer />
            </div>
            <div className={styles.audio}>
              <Audio />
            </div>
            <div className={styles.menu}>
              <AudioMiniMenu />
            </div>
          </div>
        </div>
      </div>

      <AudioTag />
    </>
  );
};

export default Player;
