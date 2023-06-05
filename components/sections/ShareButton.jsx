import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import {
  timeOutline,
  bookmark,
  bookmarkOutline,
  shareOutline,
  timer,
  time,
} from "ionicons/icons";

import ModalSetTimer from "./ModalSetTimer";
import { useFavoriteStorage } from "../../hooks/useFavoriteStorage";
import { PlayerStore } from "../../store";
import { LocalStore } from "../../store/local";
import { checkIsFavorite } from "../../lib/check";

import Favorite from "../actions/Favorite";
// import TimerAction from "../actions/TimerPrimary";
import styles from "./ShareButton.module.css";

const Timer = () => {
  // const [setTimerOpen, updateSetTimerOpen] = useState(false);
  // const handleSetTimerOpen = (open) => {
  //   updateSetTimerOpen(open);
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <IonIcon
          icon={shareOutline} //
          slot="start"
          className={styles.icon}
        />
        Share
      </div>
    </div>
  );
};

export default Timer;
