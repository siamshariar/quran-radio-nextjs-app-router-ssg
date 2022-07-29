import { IonContent, IonIcon } from "@ionic/react";
import classNames from "classnames";
import { PlayerStore, setPlaying } from "../../store";
import { play as playIcon, pause as pauseIcon } from "ionicons/icons";
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
    <IonContent className={classNames(styles.content, "ion-padding")}>
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
    </IonContent>
  );
};

export default AudioMini;
