import { IonContent, IonIcon } from "@ionic/react";
import classNames from "classnames";
import { PlayerStore, setPlaying, setPlayerMini } from "../../store";
import Tune from "../sections/TuneMini";
import {
  play as playIcon,
  pause as pauseIcon,
  chevronUpOutline as upIcon,
} from "ionicons/icons";
import { playCircle, pauseCircle } from "../../icons";
import styles from "./AudioMini.module.css";

const AudioMini = () => {
  const playing = PlayerStore.useState((s) => s.playing);
  const reciterImage = PlayerStore.useState((s) => s.reciterImage);
  const reciterName = PlayerStore.useState((s) => s.reciterName);
  const chapterName = PlayerStore.useState((s) => s.chapterName);

  const play = () => {
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  return (
    <div className={styles.content}>
      {/* <IonIcon
        icon={upIcon}
        slot="start"
        className={styles.up_icon}
        // onClick={() => setPlayerMini(false)}
      /> */}
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {/* <img src={`/img/reciters/${reciterImage}`} alt="" /> */}
          <Tune />
        </div>
        <div className={styles.center}>
          <span>{chapterName}</span>
          <span>{reciterName}</span>
        </div>
        <div className={styles.right}>
          {playing && (
            <div className={styles.btn} onClick={pause}>
              <IonIcon
                icon={playCircle} //
                slot="start"
                className={styles.icon}
              />
            </div>
          )}

          {!playing && (
            <div className={styles.btn} onClick={play}>
              <IonIcon
                icon={pauseCircle} //
                slot="start"
                className={styles.icon}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioMini;
