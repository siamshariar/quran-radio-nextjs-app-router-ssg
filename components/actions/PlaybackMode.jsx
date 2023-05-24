import { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { PlayerStore } from "../../store";
import { LocalStore } from "../../store/local";
import { useSettingStorage } from "../../hooks/useSettingStorage";
import { checkIsFavorite } from "../../lib/check";
import styles from "./PlaybackMode.module.css";

const PlaybackMode = ({ classes, icon }) => {
  const mode = LocalStore.useState((s) => s.settings.mode);

  const { setMode } = useSettingStorage();
  // const [isFavorite, setIsFavorite] = useState(false);

  // useEffect(() => {
  //   if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
  //     setIsFavorite(true);
  //   } else {
  //     setIsFavorite(false);
  //   }
  // }, [favorites, chapterIndex, reciterId]);

  // const handleAddFavorite = async () => {
  //   if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
  //     return;
  //   }
  //   await addFavorite(reciterId, chapterIndex);
  //   setIsFavorite(true);
  // };

  // const handleRemoveFavorite = async () => {
  //   if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
  //     await removeFavorite(reciterId, chapterIndex);
  //     setIsFavorite(false);
  //     return;
  //   }
  //   return;
  // };

  const setPlaybackMode = async (e, mode) => {
    await setMode(mode);
    return;
  };

  return (
    <>
      <div className={classes.root}>
        {mode && mode === "normal" && (
          <div
            className={classes.btn} //
            onClick={(e) => setPlaybackMode(e, "live")}
          >
            <IonIcon
              icon={icon.normal} //
              slot="start"
              className={classes.icon}
            />
          </div>
        )}

        {mode && mode === "live" && (
          <div
            className={classes.btn} //
            onClick={(e) => setPlaybackMode(e, "normal")}
          >
            <IonIcon
              icon={icon.live} //
              slot="start"
              className={classes.icon}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PlaybackMode;
