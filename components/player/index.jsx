import styles from "./index.module.css";
// import { chapters } from "../../data/chapters";
// import { reciters } from "../../data/reciters";
// import { recitations } from "../../data/recitations";
import { useEffect, useState } from "react";

import Header from "./Header";
import Content from "./Content";
import Audio from "./Audio";
// import ChapterCard from "../cards/Chapter";
// import ReciterCard from "../cards/Reciter";
import { Redirect, Route, useLocation } from "react-router-dom";

import {
  IonPage,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonModal,
  IonMenu,
  IonList,
  IonItem,
} from "@ionic/react";

import { close } from "ionicons/icons";

import { PlayerStore } from "../../store";
import { setPlaying, setChapterIndex } from "../../store";

const Player = () => {
  const location = useLocation();
  const [path, setPath] = useState("/");
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const chapters = PlayerStore.useState((s) => s.chapters);
  const reciters = PlayerStore.useState((s) => s.reciters);
  const recitations = PlayerStore.useState((s) => s.recitations);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const playing = PlayerStore.useState((s) => s.playing);

  const [chapterModalOpen, setChapterModalOpen] = useState(false);
  const [reciterModalOpen, setReciterModalOpen] = useState(false);

  // const [chapterIndex, setChapterIndex] = useState(0);
  // const [reciterId, setReciterId] = useState(7);
  const [src, setSrc] = useState(`${recitations[reciterId][chapterIndex]}`);
  // const [playing, setPlaying] = useState(false);
  // const [ended, setEnded] = useState(false);
  // const [init, setInit] = useState(false);

  useEffect(() => {
    setSrc(`${recitations[reciterId][chapterIndex]}`);
  }, [reciterId, chapterIndex]);

  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  useEffect(() => {
    if (path == "/") {
      setIsMiniPlayer(false);
    } else {
      setIsMiniPlayer(true);
    }
  }, [path]);

  return (
    <div
      className={`${styles.wrapper}${isMiniPlayer ? " " + styles.mini : ""}`}
    >
      <IonContent
        className={`${styles.container} ion-padding`}
        fullscreen
        overscroll={false}
      >
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <Content
            // setChapterModalOpen={setChapterModalOpen}
            // setReciterModalOpen={setReciterModalOpen}
            info={{
              chapter: {
                name: chapters[chapterIndex].name,
                meaning: chapters[chapterIndex].meaning,
              },
              reciter: {
                name: reciters[reciterId].reciter_name,
                image: reciters[reciterId].reciter_image,
              },
            }}
          />
        </div>
        <div className={styles.audio}>
          <Audio
            playing={playing}
            setPlaying={setPlaying}
            chapterIndex={chapterIndex}
            setChapterIndex={setChapterIndex}
            src={src}
            isMini={isMiniPlayer}
          />
        </div>
      </IonContent>

      {/* <IonModal
        isOpen={chapterModalOpen}
        swipeToClose={true}
        onDidDismiss={() => setChapterModalOpen(false)}
        // presentingElement={router || undefined}
      >
        <IonHeader>
          <div
            className={styles.close}
            onClick={() => setChapterModalOpen(false)}
          >
            <IonIcon icon={close} className={styles.icon} />
          </div>
        </IonHeader>
        <IonContent>
          {chapters &&
            chapters.length &&
            chapters.map((chapter) => (
              <ChapterCard
                key={chapter.chapterNo}
                chapter={chapter}
                playing={playing}
                setPlaying={setPlaying}
                chapterIndex={chapterIndex}
                setChapterIndex={setChapterIndex}
              />
            ))}
        </IonContent>
      </IonModal> */}

      {/* <IonModal
        isOpen={reciterModalOpen}
        swipeToClose={true}
        onDidDismiss={() => setReciterModalOpen(false)}
        // presentingElement={router || undefined}
      >
        <IonHeader>
          <div
            className={styles.close}
            onClick={() => setReciterModalOpen(false)}
          >
            <IonIcon icon={close} className={styles.icon} />
          </div>
        </IonHeader>
        <IonContent>
          {reciters &&
            Object.entries(reciters).map(([key, reciter]) => (
              <ReciterCard
                key={key}
                reciter={reciter}
                reciterId={reciterId}
                setReciterId={setReciterId}
              />
            ))}
        </IonContent>
      </IonModal> */}
    </div>
  );
};

export default Player;
