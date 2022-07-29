import {
  IonPage,
  IonHeader,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { PlayerStore } from "../../store";
import ChapterCard from "../cards/Chapter";
import styles from "./Chapters.module.css";

const ChapterList = () => {
  const chapters = PlayerStore.useState((s) => s.chapters);

  return (
    <IonPage style={{ paddingBottom: "132px" }}>
      <IonHeader className={styles.header}>
        <IonButton
          className={styles.back} //
          fill="clear"
          routerLink="/"
        >
          <IonIcon icon={chevronBack} slot="start" className={styles.icon} />
        </IonButton>
        <span>Chapters List</span>
      </IonHeader>
      <IonContent>
        {chapters &&
          chapters.length &&
          chapters.map((chapter) => (
            <ChapterCard key={chapter.chapterNo} chapter={chapter} />
          ))}
      </IonContent>
    </IonPage>
  );
};

export default ChapterList;
