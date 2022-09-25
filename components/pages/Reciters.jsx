import {
  IonPage,
  IonHeader,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { PlayerStore } from "../../store";
import ReciterCard from "../cards/Reciter";
import styles from "./Reciters.module.css";

const Reciters = () => {
  const reciters = PlayerStore.useState((s) => s.reciters);

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
        <span>Reciters List</span>
      </IonHeader>
      <div className={styles.search}>
        <input type="text" name="search" placeholder="Search reciter" />
      </div>
      <IonContent>
        {reciters &&
          reciters.map((reciter, index) => (
            <ReciterCard key={index} reciter={reciter} />
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Reciters;
