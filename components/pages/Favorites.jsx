import {
  IonPage,
  IonContent,
  IonList,
  IonIcon,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";

import { trashOutline, playOutline } from "ionicons/icons";

import {
  PlayerStore,
  setPlayerMini,
  setReciter,
  setChapter,
} from "../../store";

import { LocalStore } from "../../store/local";
import { useFavoriteStorage } from "../../hooks/useFavoriteStorage";
import { checkIsFavorite } from "../../lib/check";
import Header from "../ui/HeaderPrimary";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const favorites = LocalStore.useState((s) => s.favorites);
  const currentReciterId = PlayerStore.useState((s) => s.reciterId);
  const currentChapterIndex = PlayerStore.useState((s) => s.chapterIndex);
  const { removeFavorite } = useFavoriteStorage();

  const handleRemoveFavorite = async (e, reciterId, chapterIndex) => {
    // e.preventDefault();
    setPlayerMini(true);

    if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
      await removeFavorite(reciterId, chapterIndex);
      return;
    }
    return;
  };

  const handlePlayFavorite = async (reciterId, chapterIndex) => {
    setPlayerMini(false);
    if (
      reciterId === currentReciterId &&
      chapterIndex === currentChapterIndex
    ) {
      return;
    }
    setReciter(reciterId);
    setChapter(chapterIndex);
    return;
  };

  return (
    <IonPage className="page-primary">
      <Header title="Favorites" />
      <IonContent className={styles.content}>
        <IonList className={styles.list}>
          {favorites.length > 0 &&
            favorites.map((item) => (
              <IonRouterLink
                key={item.id}
                className={styles.item}
                routerLink="/"
                onClick={() =>
                  handlePlayFavorite(item.reciterId, item.chapterIndex)
                }
              >
                <div className={styles.inner}>
                  <div className={styles.left}>
                    <div className={styles.image}>
                      <img src={`/img/reciters/${item.reciterImage}`} alt="" />
                    </div>
                    <div className={styles.label}>
                      <div className={styles.reciter}>{item.reciterName}</div>
                      <div className={styles.chapter}>{item.chapterName}</div>
                    </div>
                  </div>

                  {/* <div className={styles.btns}>
                    <div
                      className={styles.btn}
                      onClick={(e) =>
                        handleRemoveFavorite(
                          e,
                          item.reciterId,
                          item.chapterIndex
                        )
                      }
                    >
                      <IonIcon
                        icon={trashOutline} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <div
                      className={styles.btn}
                      onClick={() =>
                        handlePlayFavorite(item.reciterId, item.chapterIndex)
                      }
                    >
                      <IonIcon
                        icon={playOutline} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                  </div> */}
                </div>
              </IonRouterLink>
            ))}

          {favorites.length === 0 && (
            <h2 className={styles.no_record}>No record found!</h2>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
