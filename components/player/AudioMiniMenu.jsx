import classNames from "classnames";
import styles from "./AudioMiniMenu.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IonContent,
  IonIcon,
  IonRouterLink,
  IonLabel,
  IonList,
} from "@ionic/react";

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

const pages = [
  {
    title: "Home",
    icon: home,
    iconOutline: homeOutline,
    url: "/",
  },
  {
    title: "Explore",
    icon: explore,
    iconOutline: exploreOutline,
    url: "/explore",
  },
  {
    title: "Subscriptions",
    icon: subscription,
    iconOutline: subscriptionOutline,
    url: "/subscriptions",
  },
  {
    title: "Library",
    icon: library,
    iconOutline: libraryOutline,
    url: "/library",
  },
];

const AudioMiniMenu = () => {
  const location = useLocation();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    // <IonContent className={classNames(styles.content, "ion-padding")}>
    <div className={classNames(styles.content, styles.wrapper)}>
      <IonList className={styles.list}>
        {pages.map((p, i) => (
          <IonRouterLink //
            routerLink={p.url}
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
