import { useEffect, useState } from "react";
import classNames from "classnames";
import { IonIcon } from "@ionic/react";

import {
  timeOutline,
  bookmark,
  bookmarkOutline,
  shareOutline,
} from "ionicons/icons";

import ModalSetTimer from "./ModalSetTimer";
import { useFavoriteStorage } from "../../hooks/useFavoriteStorage";
import { PlayerStore } from "../../store";
import { LocalStore } from "../../store/local";
import { checkIsFavorite } from "../../lib/check";
import styles from "./Timer.module.css";

const Timer = () => {
  const [setTimerOpen, updateSetTimerOpen] = useState(false);
  const handleSetTimerOpen = (open) => {
    updateSetTimerOpen(open);
  };

  const { addFavorite, removeFavorite } = useFavoriteStorage();

  const favorites = LocalStore.useState((s) => s.favorites);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, chapterIndex, reciterId]);

  const handleAddFavorite = async () => {
    if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
      return;
    }
    await addFavorite(reciterId, chapterIndex);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = async () => {
    if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
      await removeFavorite(reciterId, chapterIndex);
      setIsFavorite(false);
      return;
    }
    return;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <IonIcon
          icon={shareOutline} //
          slot="start"
          className={styles.icon}
        />

        {!isFavorite && (
          <IonIcon
            icon={bookmarkOutline} //
            slot="start"
            className={styles.icon}
            onClick={() => handleAddFavorite()}
          />
        )}

        {isFavorite && (
          <IonIcon
            icon={bookmark} //
            slot="start"
            className={styles.icon}
            onClick={() => handleRemoveFavorite()}
          />
        )}

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
