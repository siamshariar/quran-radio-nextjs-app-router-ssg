import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

import {
  IonContent,
  IonIcon,
  IonRouterLink,
  IonLabel,
  IonList,
} from "@ionic/react";

import { PlayerStore } from "../../store";

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

import styles from "./AudioMiniMenu.module.css";

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
    title: "Settings",
    icon: library,
    iconOutline: libraryOutline,
    url: "/settings",
  },
];

const AudioMiniMenu = () => {
  const location = useLocation();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

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
                icon={p.url === path ? p.icon : p.iconOutline}
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
