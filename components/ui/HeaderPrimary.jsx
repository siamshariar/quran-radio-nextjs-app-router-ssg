import { chevronBack } from "ionicons/icons";
import styles from "./HeaderPrimary.module.css";

const Header = ({ title }) => {
  return (
    <ion-header class={styles.header}>
      <ion-button
        class={styles.back} //
        fill="clear"
        routerLink="/"
      >
        <ion-icon icon={chevronBack} slot="start" class={styles.icon} />
      </ion-button>
      <span>{title}</span>
    </ion-header>
  );
};

export default Header;
