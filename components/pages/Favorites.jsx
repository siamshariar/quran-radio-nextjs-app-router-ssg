import { IonPage, IonContent } from "@ionic/react";
import Header from "../ui/HeaderPrimary";
import styles from "./Favorites.module.css";

const Favorites = () => {
  return (
    <IonPage style={{ paddingBottom: "132px" }}>
      <Header title="Favorites" />
      <IonContent className={styles.content}>Fsvorites list</IonContent>
    </IonPage>
  );
};

export default Favorites;
