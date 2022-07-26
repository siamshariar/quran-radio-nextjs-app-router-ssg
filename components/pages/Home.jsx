import styles from "./Reciters.module.css";
// import { chapters } from "../../data/chapters";
// import { reciters } from "../../data/reciters";
// import { recitations } from "../../data/recitations";
import { useEffect, useState } from "react";
import ReciterCard from "../cards/Reciter";

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

import { PlayerStore } from "../../store";
import { setReciterId } from "../../store";

const Home = () => {
  const reciters = PlayerStore.useState((s) => s.reciters);
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
        <span>Reciters List</span>
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
    </IonPage>
  );
};

export default Home;
