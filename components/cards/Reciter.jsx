import Link from "next/link";
// import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import {
  PlayerStore,
  setReciter,
  setPlayerMini,
  setChapter,
} from "../../store";
import { playCircle, pauseCircle } from "../../icons";
import styles from "./Reciter.module.css";

import dynamic from "next/dynamic";

const IonIcon = dynamic(
  () => import("@ionic/react").then((mod) => mod.IonIcon),
  {
    ssr: false,
  }
);

const Reciter = ({ reciter }) => {
  const playing = PlayerStore.useState((s) => s.playing);
  const reciterId = PlayerStore.useState((s) => s.reciterId);

  const handleReciterChange = () => {
    setPlayerMini(false);
    if (reciterId === reciter.reciter_id) return;
    const randomChapterIndex = Math.floor(Math.random() * 114);
    setReciter(reciter.reciter_id);
    setChapter(randomChapterIndex);
  };

  return (
    <div
      className={classNames(
        styles.card,
        reciterId === reciter.reciter_id ? styles.active : ""
      )}
    >
      <Link href="/" legacyBehavior>
        <a className={styles.wrapper} onClick={() => handleReciterChange()}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={`/img/reciters/${reciter.reciter_image}`} alt="" />
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.name}>{reciter.reciter_name}</div>
            <div className={styles.name2}>- Recited sura 114</div>
          </div>
          <div className={styles.right}>
            {reciterId === reciter.reciter_id && playing && (
              <IonIcon
                icon={playCircle} //
                slot="start"
                className={styles.icon}
              />
            )}
            {(reciterId !== reciter.reciter_id || !playing) && (
              <IonIcon
                icon={pauseCircle}
                slot="start"
                className={styles.icon}
              />
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Reciter;
