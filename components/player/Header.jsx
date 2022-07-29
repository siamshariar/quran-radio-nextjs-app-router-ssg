import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
} from "@ionic/react";
import { menu, settings } from "ionicons/icons";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bg}></div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.btn}>
            {/* <IonIcon className={styles.icon} slot="start" icon={menu} /> */}
            <IonMenuButton className={styles.menu_btn} icon={menu} />
          </div>
        </div>

        <div className={styles.logo}>
          <div className={styles.title}>QR</div>
        </div>

        <div className={styles.right}>
          <div className={styles.btn}>
            <IonIcon className={styles.icon} slot="start" icon={settings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
