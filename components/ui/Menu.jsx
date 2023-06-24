import Link from "next/link";
import classNames from "classnames";
import {
  peopleOutline,
  informationCircleOutline,
  helpCircleOutline,
} from "ionicons/icons";
import {
  homeOutline,
  musicalNoteOutline,
  starOutline,
  musicalNote,
  settingsOutline,
  share,
} from "@/icons";
import { PlayerStore, setChapter, setSrc, setPlaying } from "@/store";
import styles from "./Menu.module.css";

const menus = [
  {
    title: "Home",
    icon: homeOutline,
    url: "/",
  },
  {
    title: "Reciters",
    icon: peopleOutline,
    url: "/reciters",
  },
  {
    title: "Chapters",
    icon: musicalNoteOutline,
    url: "/chapters",
  },
  {
    title: "Favorites",
    icon: starOutline,
    url: "/favorites",
  },
  {
    title: "Recent",
    icon: musicalNote,
    url: "/recent",
  },
  {
    title: "About",
    icon: informationCircleOutline,
    url: "/about",
  },
  {
    title: "Support",
    icon: helpCircleOutline,
    url: "/support",
  },
  {
    title: "Settings",
    icon: settingsOutline,
    url: "/settings",
  },
  {
    title: "Share",
    icon: share,
    url: "#",
  },
];

const Menu = () => {
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  return (
    <ion-menu
      side="start"
      content-id="main-content"
      menuId="main-menu"
      class={styles.menu}
    >
      <ion-header class={styles.header}>
        <div className={styles.logo}>
          <div className={styles.title}>
            <Link href="/">
              <img src="/img/logo/logo.png" alt="" />
            </Link>
          </div>
        </div>
      </ion-header>
      <ion-content class={styles.content}>
        <ion-list class={styles.list}>
          {menus.map((m, k) => (
            <ion-menu-toggle auto-hide={false} key={k}>
              <Link
                href={m.url === "/chapters" ? `/reciters/${reciterId}` : m.url}
              >
                <ion-item detail={false} lines="none" class={styles.item}>
                  <ion-icon icon={m.icon} slot="start" class={styles.icon} />
                  {m.title}
                </ion-item>
              </Link>
            </ion-menu-toggle>
          ))}
        </ion-list>
      </ion-content>

      <div className={classNames(styles.footer, "p-4 text-base")}>
        <span>Powered by - </span>
        <ion-menu-toggle auto-hide={false} class="md">
          <a href="https://www.deeniinfotech.com/">Deeni Info Tech</a>
        </ion-menu-toggle>
      </div>
    </ion-menu>
  );
};

export default Menu;
