import classNames from "classnames";
import {
  timeOutline,
  bookmark,
  bookmarkOutline,
  // shareOutline,
  // timer,
  time,
  musicalNoteOutline,
  star,
} from "ionicons/icons";

import { PlayerStore } from "@/store";
import {
  starOutline,
  shareOutline,
  clockOutline,
  // timeOutline,
} from "../../icons";

import styles from "./ButtonGroup.module.css";
import Favorite from "../actions/Favorite";
import PlaybackRate from "../actions/PlaybackRate";

const Buttons = () => {
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const chapterList = PlayerStore.useState((s) => s.chapterList);

  return (
    <div className={styles.content}>
      <Favorite
        reciterId={reciterId}
        chapterNo={chapterList[chapterIndex]}
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
      {/* <Timer
        classes={{
          root: styles.item,
          btn: styles.btn,
          icon: styles.icon,
        }}
        icon={{
          added: time,
          removed: timeOutline,
        }}
      /> */}
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
