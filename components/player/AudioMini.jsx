import { IonContent, IonIcon } from "@ionic/react";
import classNames from "classnames";
import {
  PlayerStore,
  setPlaying,
  setChapterIndex,
  setPlayerOpen,
  setPlayerMini,
} from "../../store";
import { play as playIcon, pause as pauseIcon } from "ionicons/icons";
import styles from "./AudioMini.module.css";

const AudioMini = () => {
  const reciters = PlayerStore.useState((s) => s.reciters);
  const playing = PlayerStore.useState((s) => s.playing);
  const reciterId = PlayerStore.useState((s) => s.reciterId);

  const play = () => {
    setPlaying(true);
    // setEnded(false);
    // setInit(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  return (
    <IonContent className={classNames(styles.content, "ion-padding")}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <img
            src={`/img/reciters/${reciters[reciterId].reciter_image}`}
            alt=""
          />
        </div>
        <div className={styles.center}>{reciters[reciterId].reciter_name}</div>
        <div className={styles.right}>
          {playing && (
            <div className={`${styles.btn} ${styles.large}`} onClick={pause}>
              <IonIcon
                icon={pauseIcon}
                slot="start"
                className={styles.icon}
                // onClick={(e) => handlePopup(e)}
              />
            </div>
          )}

          {!playing && (
            <div className={`${styles.btn} ${styles.large}`} onClick={play}>
              <IonIcon
                icon={playIcon}
                slot="start"
                className={styles.icon}
                // onClick={(e) => handlePopup(e)}
              />
            </div>
          )}
        </div>
      </div>
    </IonContent>
  );
};

export default AudioMini;
