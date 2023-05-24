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
    <div className={styles.panel_content}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {/* <Header /> */}

          <IonButton
            className={styles.back} //
            fill="clear"
            routerLink="/"
          >
            <IonIcon icon={chevronBack} slot="start" className={styles.icon} />
          </IonButton>
        </div>

        <div className={styles.search}>
          <input type="text" name="search" placeholder="Search reciter" />
        </div>
        {/* <ion-content> */}
        {reciters &&
          reciters.map((reciter, index) => (
            <ReciterCard key={index} reciter={reciter} />
          ))}
        {/* </ion-content> */}
      </div>
    </div>
  );
};

export default Reciters;
