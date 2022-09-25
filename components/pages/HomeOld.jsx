import {
  IonPage,
  IonHeader,
  IonButton,
  IonIcon,
  IonContent,
  IonRouterLink,
  IonLabel,
  IonList,
} from "@ionic/react";

import classNames from "classnames";
import { menu } from "ionicons/icons";

import {
  homeOutline,
  exploreOutline,
  subscriptionOutline,
  libraryOutline,
} from "../../icons";

import styles from "./Home.module.css";

const pages = [
  {
    title: "Home",
    icon: homeOutline,
    url: "/",
  },
  {
    title: "Chapters",
    icon: exploreOutline,
    url: "/chapters",
  },
  {
    title: "Subscriptions",
    icon: subscriptionOutline,
    url: "/chapters",
  },
  {
    title: "Library",
    icon: libraryOutline,
    url: "/chapters",
  },
  {
    title: "Reciters",
    icon: exploreOutline,
    url: "/reciters",
  },
  {
    title: "Subscriptions",
    icon: subscriptionOutline,
    url: "/reciters",
  },
];

const Home = () => {
  return (
    <IonPage className="page-primary">
      <IonHeader className={styles.header}>
        <IonButton
          className={styles.back} //
          fill="clear"
          routerLink="/"
        >
          <IonIcon icon={menu} slot="start" className={styles.icon} />
        </IonButton>
        <span>Quran Radio</span>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className={styles.content}>
          <IonList className={styles.list}>
            {pages.map((p, i) => (
              <div className={styles.item} key={i}>
                <IonRouterLink //
                  routerLink={p.url}
                  className={styles.item_link}
                >
                  <div className={styles.item_inner}>
                    <div className={styles.item_ctn}>
                      <IonIcon
                        icon={p.icon}
                        slot="start"
                        className={styles.icon}
                      />
                      <IonLabel className={styles.label}>{p.title}</IonLabel>
                    </div>
                  </div>
                </IonRouterLink>
              </div>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
