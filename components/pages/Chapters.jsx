import styles from "./Chapters.module.css";

// import { chapters } from "../../data/chapters";
// import { reciters } from "../../data/reciters";
// import { recitations } from "../../data/recitations";
import { useEffect, useState } from "react";
import ChapterCard from "../cards/Chapter";

import { PlayerStore } from "../../store";
import { setPlaying, setChapterIndex } from "../../store";

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

import { close, chevronBack } from "ionicons/icons";

const ChapterList = () => {
  // const [chapterModalOpen, setChapterModalOpen] = useState(false);
  // const [reciterModalOpen, setReciterModalOpen] = useState(false);

  const chapters = PlayerStore.useState((s) => s.chapters);
  const recitations = PlayerStore.useState((s) => s.recitations);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const playing = PlayerStore.useState((s) => s.playing);

  // audio player
  // const [chapterIndex, setChapterIndex] = useState(0);
  // const [reciterId, setReciterId] = useState(7);
  const [src, setSrc] = useState(`${recitations[reciterId][chapterIndex]}`);
  // const [playing, setPlaying] = useState(false);
  // const [ended, setEnded] = useState(false);
  // const [init, setInit] = useState(false);

  useEffect(() => {
    setSrc(`${recitations[reciterId][chapterIndex]}`);
  }, [reciterId, chapterIndex]);

  return (
    <IonPage style={{ paddingBottom: "132px" }}>
      <IonHeader className={styles.header}>
        <IonButton
          className={styles.back} //
          fill="clear"
          routerLink="/"
        >
          <IonIcon icon={chevronBack} className={styles.icon} />
        </IonButton>
        <span>Chapters List</span>
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
    </IonPage>
  );
};

export default ChapterList;
