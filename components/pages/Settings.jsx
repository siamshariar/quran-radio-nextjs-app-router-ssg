import {
  IonPage,
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonRouterLink,
} from "@ionic/react";

import {
  recordingOutline,
  libraryOutline,
  musicalNoteOutline,
  bookmarksOutline,
  settingsOutline,
  globeOutline,
  starOutline,
  phonePortraitOutline,
  informationOutline,
  informationCircleOutline,
  mailOutline,
  appsOutline,
  thumbsUpOutline,
  bagCheckOutline,
  checkboxOutline,
  planetOutline,
} from "ionicons/icons";

import Header from "../ui/HeaderPrimary";
import styles from "./Settings.module.css";

const pages1 = [
  {
    label: "Recordings",
    icon: recordingOutline,
    url: "/more/recordings",
  },
  {
    label: "Library",
    icon: libraryOutline,
    url: "/more/library",
  },
  {
    label: "Recently played",
    icon: musicalNoteOutline,
    url: "/more/recent",
  },
  {
    label: "Favorites",
    icon: bookmarksOutline,
    url: "/more/favorites",
  },
  {
    label: "Settings",
    icon: settingsOutline,
    url: "/more/settings",
  },
];

const Settings = () => {
  return (
    <IonPage className="page-primary">
      <Header title="Settings" />
      <IonContent className={styles.content}>Settings page</IonContent>
    </IonPage>
  );
};

export default Settings;
