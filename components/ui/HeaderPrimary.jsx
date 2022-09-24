import { IonHeader, IonButton, IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import styles from "./HeaderPrimary.module.css";

const Header = ({ title }) => {
  return (
    <IonHeader className={styles.header}>
      <IonButton
        className={styles.back} //
        fill="clear"
        routerLink="/"
      >
        <IonIcon icon={chevronBack} slot="start" className={styles.icon} />
      </IonButton>
      <span>{title}</span>
    </IonHeader>
  );
};

export default Header;
