import { IonButton, IonIcon } from "@ionic/react";
import classNames from "classnames";
import { chevronBack } from "../../icons";
import { PlayerStore } from "../../store";
import ReciterCard from "../cards/Reciter";
import styles from "./Reciters.module.css";

const Reciters = () => {
  const reciters = PlayerStore.useState((s) => s.reciters);

  return (
    <div className={styles.panel_content}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.nav_left}>
            <IonButton className={styles.back} fill="clear" routerLink="/">
              <IonIcon
                icon={chevronBack}
                slot="start"
                className={styles.icon}
              />
            </IonButton>
          </div>

          <div className={styles.nav_text}>Reciters</div>
          <div className={styles.nav_left}></div>
        </div>

        <div className={styles.search}>
          <input type="text" name="search" placeholder="Search" />
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
