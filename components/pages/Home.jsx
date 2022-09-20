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

import Player from "../player";

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
    <IonPage style={{ paddingBottom: "132px" }}>
      <Player />
    </IonPage>
  );
};

export default Home;
