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

import Header from "../player/Header";
import Content from "../player/Content";
import Audio from "../player/Audio";
import AudioMini from "../player/AudioMini";
import AudioMiniMenu from "../player/AudioMiniMenu";
import Timer from "../player/Timer";
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
      <div className={styles.panel_content}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.content}>
            <Content />
          </div>
          <div className={styles.timer}>
            <Timer />
          </div>
          <div className={styles.audio}>
            <Audio />
          </div>
          <div className={styles.menu}>
            <AudioMiniMenu />
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Home;
