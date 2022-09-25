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

const ChapterList = ({ match }) => {
  const slug = match.params.slug;
  const chapters = PlayerStore.useState((s) => s.chapters);
  const reciterName = PlayerStore.useState((s) => s.reciterName);
  const reciterImage = PlayerStore.useState((s) => s.reciterImage);

  return (
    <IonPage className="page-primary">
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
        <div className={styles.reciter}>
          <div className={styles.reciter_name}>
            <span>{reciterName}</span>
          </div>
          <div className={styles.image}>
            <img src={`/img/reciters/${reciterImage}`} alt="reciter" />
          </div>
        </div>
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
