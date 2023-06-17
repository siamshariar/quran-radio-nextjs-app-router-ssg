// import { IonHeader, IonButton, IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import styles from "./HeaderPrimary.module.css";

import dynamic from "next/dynamic";

const IonIcon = dynamic(
  () => import("@ionic/react").then((mod) => mod.IonIcon),
  {
    ssr: false,
  }
);
const IonButton = dynamic(
  () => import("@ionic/react").then((mod) => mod.IonButton),
  {
    ssr: false,
  }
);
const IonHeader = dynamic(
  () => import("@ionic/react").then((mod) => mod.IonHeader),
  {
    ssr: false,
  }
);

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
