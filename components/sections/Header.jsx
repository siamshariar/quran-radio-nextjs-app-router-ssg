import { IonIcon, IonMenuButton, IonRouterLink } from "@ionic/react";
import { menu, timeOutline, time } from "ionicons/icons";
import { settings, hamburger } from "../../icons";
import Timer from "../actions/TimerPrimary";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.bg}></div> */}
      <div className={styles.content}>
        <div className={styles.left}>
          {/* <IonRouterLink
            routerLink="/more" //
            className={styles.link}
          > */}
          <div className={styles.menu_btn}>
          <IonIcon
          icon={hamburger} //
          slot="start"
          className={styles.icon}
        />

          </div>
          {/* </IonRouterLink> */}
        </div>

        <div className={styles.logo}>
          <div className={styles.title}>
            <img src="/img/logo/logo.png" alt="" />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.btn}>
            <Timer
              classes={{
                root: styles.item,
                btn: styles.btn,
                icon: styles.icon,
              }}
              icon={{
                added: time,
                removed: settings,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
