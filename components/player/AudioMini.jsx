import { IonContent, IonIcon } from "@ionic/react";
import classNames from "classnames";
import { PlayerStore, setPlaying, setPlayerMini } from "../../store";
import {
  play as playIcon,
  pause as pauseIcon,
  chevronUpOutline as upIcon,
} from "ionicons/icons";
import styles from "./AudioMini.module.css";

const AudioMini = () => {
  const playing = PlayerStore.useState((s) => s.playing);
  const reciterImage = PlayerStore.useState((s) => s.reciterImage);
  const reciterName = PlayerStore.useState((s) => s.reciterName);

  const play = () => {
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  return (
    <div className={styles.content}>
      <IonIcon
        icon={upIcon}
        slot="start"
        className={styles.up_icon}
        // onClick={() => setPlayerMini(false)}
      />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <img src={`/img/reciters/${reciterImage}`} alt="" />
        </div>
        <div className={styles.center}>{reciterName}</div>
        <div className={styles.right}>
          {playing && (
            <div className={styles.btn} onClick={pause}>
              <IonIcon icon={pauseIcon} slot="start" className={styles.icon} />
            </div>
          )}

          {!playing && (
            <div className={styles.btn} onClick={play}>
              <IonIcon icon={playIcon} slot="start" className={styles.icon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioMini;
