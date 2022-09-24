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
import styles from "./More.module.css";

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

const pages2 = [
  {
    label: "Visit our website",
    icon: globeOutline,
    webUrl: "https://quran.radio/",
  },
  {
    label: "Review our app",
    icon: starOutline,
    webUrl: "https://quran.radio/",
  },
  {
    label: "Test our app",
    icon: musicalNoteOutline,
    webUrl: "https://quran.radio/",
  },
  {
    label: "Upgrade app",
    icon: phonePortraitOutline,
    webUrl: "https://quran.radio/",
  },
];

const pages3 = [
  {
    label: "About us",
    icon: informationCircleOutline,
    url: "/more/about-us",
  },
  {
    label: "Contact us",
    icon: mailOutline,
    url: "/more/contact-us",
  },
  {
    label: "Deeni Info Tech",
    icon: planetOutline,
    webUrl: "http://deeniinfotech.com/",
  },
  {
    label: "Our applications",
    icon: appsOutline,
    url: "/more/applications",
  },
];

const pages4 = [
  {
    label: "Sponsorship",
    icon: bagCheckOutline,
    url: "/more/sponsors",
  },
  {
    label: "Donate",
    icon: checkboxOutline,
    url: "/more/donate",
  },
];

const MenuItems = ({ pages }) => {
  return (
    <IonList className={styles.list}>
      {pages &&
        pages.map((page, index) =>
          page.url ? (
            <IonRouterLink //
              routerLink={page.url}
              key={index}
              className={styles.item}
            >
              <div className={styles.inner}>
                <IonIcon
                  icon={page.icon}
                  slot="start"
                  className={styles.icon}
                />
                <IonLabel className={styles.label}>{page.label}</IonLabel>
              </div>
            </IonRouterLink>
          ) : page.webUrl ? (
            <a
              href={page.webUrl}
              key={index}
              className={styles.item}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.inner}>
                <IonIcon
                  icon={page.icon}
                  slot="start"
                  className={styles.icon}
                />
                <IonLabel className={styles.label}>{page.label}</IonLabel>
              </div>
            </a>
          ) : null
        )}
    </IonList>
  );
};

const More = () => {
  return (
    <IonPage style={{ paddingBottom: "132px" }}>
      <Header title="Quran Radio" />

      <IonContent className={styles.content}>
        <MenuItems pages={pages1} />
        <hr className={styles.separator} />
        <MenuItems pages={pages2} />
        <hr className={styles.separator} />
        <MenuItems pages={pages3} />
        <hr className={styles.separator} />
        <MenuItems pages={pages4} />
      </IonContent>
    </IonPage>
  );
};

export default More;
