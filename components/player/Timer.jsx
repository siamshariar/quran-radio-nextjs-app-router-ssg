import classNames from "classnames";
import { IonIcon } from "@ionic/react";
import { timeOutline, bookmarkOutline, shareOutline } from "ionicons/icons";
import ModalSetTimer from "./ModalSetTimer";
import styles from "./Timer.module.css";
import { useState } from "react";

const Timer = () => {
  const [setTimerOpen, updateSetTimerOpen] = useState(false);
  const handleSetTimerOpen = (open) => {
    updateSetTimerOpen(open);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <IonIcon
          icon={shareOutline} //
          slot="start"
          className={styles.icon}
        />
        <IonIcon
          icon={bookmarkOutline} //
          slot="start"
          className={styles.icon}
        />
        <IonIcon
          icon={timeOutline} //
          slot="start"
          className={styles.icon}
          onClick={() => handleSetTimerOpen(true)}
        />
      </div>

      <ModalSetTimer open={setTimerOpen} handler={handleSetTimerOpen} />
    </div>
  );
};

export default Timer;
