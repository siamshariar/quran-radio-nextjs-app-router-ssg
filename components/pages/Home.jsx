import styles from "./Home.module.css";

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

const Home = () => {
  return (
    <IonPage className={styles.wrapper}>
      <IonContent className={styles.container}></IonContent>
    </IonPage>
  );
};

export default Home;
