import classNames from "classnames";
import {
  timeOutline,
  bookmark,
  bookmarkOutline,
  // shareOutline,
  timer,
  time,
  musicalNoteOutline,
} from "ionicons/icons";

import { starOutline, shareOutline, clockOutline } from "../../icons";

import styles from "./ButtonGroup.module.css";
import Favorite from "../actions/Favorite";
import PlaybackRate from "../actions/PlaybackRate";

const Buttons = () => {
  return (
    <div className={styles.content}>
      <Favorite
        classes={{
          root: styles.item,
          btn: styles.btn,
          icon: styles.icon,
        }}
        icon={{
          added: bookmark,
          removed: starOutline,
        }}
      />
      <PlaybackRate
        classes={{
          root: styles.item,
          btn: styles.btn,
          icon: styles.icon,
        }}
        icon={shareOutline}
      />
      <PlaybackRate
        classes={{
          root: styles.item,
          btn: styles.btn,
          icon: styles.icon,
        }}
        icon={clockOutline}
      />
    </div>
  );
};

export default Buttons;
