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
  trashOutline,
} from "ionicons/icons";
import { useState } from "react";
import DialogPrimary from "../utils/DialogPrimary";
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
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleDialog = (open) => {
    setDialogOpen(open);
  };

  return (
    <>
      <IonPage className="page-primary">
        <Header title="Settings" />
        <IonContent className={styles.content}>
          <IonList className={styles.list}>
            <div className={styles.item}>
              <div className={styles.inner}>
                <div className={styles.left}>
                  <IonIcon
                    icon={trashOutline}
                    slot="start"
                    className={styles.icon}
                  />
                  <IonLabel className={styles.label}>
                    Delete all favorites
                  </IonLabel>
                </div>
                <div className={styles.right}>
                  <button
                    className={styles.btn}
                    onClick={() => handleDialog(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </IonList>
        </IonContent>
        <DialogPrimary isOpen={isDialogOpen} closer={() => handleDialog(false)}>
          Confirm <br />
          Do you really want to Delete
          <br />
          yes no
        </DialogPrimary>
      </IonPage>
    </>
  );
};

export default Settings;
