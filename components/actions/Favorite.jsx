import { useEffect, useState } from "react";
import { LocalStore } from "@/store/local";
import { useFavoriteStorage } from "@/hooks/useFavoriteStorage";
import { checkIsFavorite } from "@/lib/check";

const Favorite = ({ reciterId, chapterNo, classes, icon }) => {
  const favorites = LocalStore.useState((s) => s.favorites);
  const { addFavorite, removeFavorite } = useFavoriteStorage();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (checkIsFavorite(favorites, reciterId, chapterNo)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, chapterNo, reciterId]);

  const handleAddFavorite = async () => {
    if (checkIsFavorite(favorites, reciterId, chapterNo)) {
      return;
    }
    await addFavorite(reciterId, chapterNo);
    setIsFavorite(true);
    return;
  };

  const handleRemoveFavorite = async () => {
    if (checkIsFavorite(favorites, reciterId, chapterNo)) {
      await removeFavorite(reciterId, chapterNo);
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
          <ion-icon icon={icon.added} slot="start" class={classes.icon} />
        </div>
      )}
      {!isFavorite && (
        <div
          className={classes.btn} //
          onClick={() => handleAddFavorite()}
        >
          <ion-icon icon={icon.removed} slot="start" class={classes.icon} />
        </div>
      )}
    </div>
  );
};

export default Favorite;
