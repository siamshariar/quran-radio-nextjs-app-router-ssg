import { useEffect, useState } from "react";
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
import styles from "./Timer.module.css";
import Favorite from "../actions/Favorite";
import TimerAction from "../actions/TimerPrimary";

const Timer = () => {
  // const [setTimerOpen, updateSetTimerOpen] = useState(false);
  // const handleSetTimerOpen = (open) => {
  //   updateSetTimerOpen(open);
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ion-icon icon={shareOutline} slot="start" class={styles.icon} />

        <Favorite
          classes={{
            root: styles.item,
            btn: styles.btn,
            icon: styles.icon,
          }}
          icon={{
            added: bookmark,
            removed: bookmarkOutline,
          }}
        />

        <TimerAction
          classes={{
            root: styles.item,
            btn: styles.btn,
            icon: styles.icon,
          }}
          icon={{
            added: time,
            removed: timeOutline,
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
