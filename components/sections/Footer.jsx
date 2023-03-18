import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import classNames from "classnames";

import { IonIcon, IonRouterLink, IonLabel, IonList } from "@ionic/react";

import { grid, gridOutline } from "ionicons/icons";
import { PlayerStore } from "../../store";
import { useRouter } from "next/router";

import {
  home,
  homeOutline,
  explore,
  exploreOutline,
  subscription,
  subscriptionOutline,
  library,
  libraryOutline,
} from "../../icons";

import styles from "./Footer.module.css";

const pages = [
  {
    title: "Home",
    icon: home,
    iconOutline: homeOutline,
    url: "/",
  },
  {
    type: "chapter",
    title: "Chapters",
    icon: explore,
    iconOutline: exploreOutline,
    url: "/reciters",
  },
  {
    title: "Reciters",
    icon: subscription,
    iconOutline: subscriptionOutline,
    url: "/reciters",
  },
  {
    title: "More",
    icon: grid,
    iconOutline: gridOutline,
    url: "/more",
  },
];

const AudioMiniMenu = () => {
  // const location = useLocation();
  const router = useRouter();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  const reciterSlug = PlayerStore.useState((s) => s.reciterSlug);

  return (
    // <IonContent className={classNames(styles.content, "ion-padding")}>
    <div className={classNames(styles.content, styles.wrapper)}>
      <IonList className={styles.list}>
        {pages.map((p, i) => (
          <IonRouterLink //
            routerLink={
              p.type && p.type === "chapter" ? `${p.url}/${reciterSlug}` : p.url
            }
            key={i}
            className={styles.item}
          >
            <div className={styles.inner}>
              <IonIcon
                icon={
                  p.type &&
                  p.type === "chapter" &&
                  path === `${p.url}/${reciterSlug}`
                    ? p.icon
                    : p.type !== "chapter" && p.url === path
                    ? p.icon
                    : p.url === "/more" && path.indexOf("/more") === 0
                    ? p.icon
                    : p.iconOutline
                }
                slot="start"
                className={styles.icon}
              />
              <IonLabel className={styles.label}>{p.title}</IonLabel>
            </div>
          </IonRouterLink>
        ))}
      </IonList>
    </div>
    // </IonContent>
  );
};

export default AudioMiniMenu;
