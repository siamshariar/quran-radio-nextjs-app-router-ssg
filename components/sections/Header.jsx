import Image from "next/image";
import Link from "next/link";
import { IonIcon, IonMenuButton, IonRouterLink } from "@ionic/react";
import { menuController } from "@ionic/core";
import { menu, timeOutline, time } from "ionicons/icons";
import { settings, hamburger } from "../../icons";
import Settings from "../actions/Settings";
import Timer from "../actions/TimerPrimary";
import styles from "./Header.module.css";

const Header = () => {
  const menuClick = async (e) => {
    e.preventDefault();
    window.menuController = menuController;
    console.log("Nazmul");
    await menuController.open();
  };

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.bg}></div> */}
      <div className={styles.content}>
        <div className={styles.left}>
          {/* <Link href="/">
            <ion-button onClick={menuClick}>
              <span>Menu</span>
            </ion-button>
          </Link> */}

          {/* <ion-menu-toggle>
            <ion-button>Click to open the menu</ion-button>
          </ion-menu-toggle> */}

          {/* <ion-button onClick={menuClick}>Menu</ion-button> */}

          {/* <IonRouterLink
            routerLink="/more" //
            className={styles.link}
          > */}
          <div className={styles.menu_btn}>
            <ion-buttons slot="start">
              <ion-menu-button autoHide="false" menuId="menu1">
                <ion-icon
                  slot="icon"
                  name={hamburger}
                  icon={hamburger}
                ></ion-icon>
              </ion-menu-button>
            </ion-buttons>

            {/* <ion-buttons slot="start">
              <ion-menu-button autoHide="false" menuId="menu2">
                menu 2
              </ion-menu-button>
            </ion-buttons> */}

            {/* <ion-menu-button className={styles.ion_btn}>
              <ion-icon
                icon={hamburger} //
                slot="icon"
                className={styles.icon}
                // onClick={menuClick}
              ></ion-icon>
            </ion-menu-button> */}
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
            <Settings
              classes={{
                root: styles.item,
                btn: styles.btn,
                icon: styles.icon,
              }}
              icon={settings}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
