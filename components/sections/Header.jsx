import Image from "next/image";
import Link from "next/link";
import { menuController } from "@ionic/core";
import { menu, timeOutline, time } from "ionicons/icons";
import { settings, hamburger } from "../../icons";
import Settings from "../actions/Settings";
import styles from "./Header.module.css";

const Header = () => {
  const menuClick = async (e) => {
    e.preventDefault();
    window.menuController = menuController;
    await menuController.open();
    console.log("Nazmul");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.menu_btn}>
            <ion-icon
              icon={hamburger} //
              slot="start"
              class={styles.icon}
              onClick={menuClick}
            ></ion-icon>
          </div>
        </div>

        <div className={styles.logo}>
          <div className={styles.title}>
            <Link href="/">
              <img src="/img/logo/logo.png" alt="" />
            </Link>
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
