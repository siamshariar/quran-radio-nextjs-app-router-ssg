import { useEffect, useState } from "react";
// import { IonIcon } from "@ionic/react";
import { PlayerStore } from "../../store";
import { LocalStore } from "../../store/local";
import { useFavoriteStorage } from "../../hooks/useFavoriteStorage";
import { checkIsFavorite } from "../../lib/check";

import dynamic from "next/dynamic";

const IonIcon = dynamic(
  () => import("@ionic/react").then((mod) => mod.IonIcon),
  {
    ssr: false,
  }
);

const Favorite = ({ classes, icon }) => {
  const favorites = LocalStore.useState((s) => s.favorites);
  const reciterId = PlayerStore.useState((s) => s.reciterId);
  const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);

  const { addFavorite, removeFavorite } = useFavoriteStorage();
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
    <div className={classes.root}>
      {isFavorite && (
        <div
          className={classes.btn} //
          onClick={() => handleRemoveFavorite()}
        >
          <IonIcon
            icon={icon.added} //
            slot="start"
            className={classes.icon}
          />
        </div>
      )}
      {!isFavorite && (
        <div
          className={classes.btn} //
          onClick={() => handleAddFavorite()}
        >
          <IonIcon
            icon={icon.removed} //
            slot="start"
            className={classes.icon}
          />
        </div>
      )}
    </div>
  );
};

export default Favorite;
