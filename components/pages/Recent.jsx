import {
  IonPage,
  IonContent,
  IonList,
  IonIcon,
  IonRouterLink,
} from "@ionic/react";

import { musicalNoteOutline, playOutline } from "ionicons/icons";

import {
  PlayerStore,
  setPlayerMini,
  setReciter,
  setChapter,
} from "../../store";

import { LocalStore } from "../../store/local";
import { formatDate } from "../../lib/format";
// import { useRecentStorage } from "../../hooks/useRecentStorage";
// import { checkIsInRecent } from "../../lib/check";
import Header from "../ui/HeaderPrimary";
import styles from "./Recent.module.css";

const RecentlyPlayed = () => {
  const recent = LocalStore.useState((s) => s.recent);
  const currentReciterId = PlayerStore.useState((s) => s.reciterId);
  const currentChapterIndex = PlayerStore.useState((s) => s.chapterIndex);

  const handlePlayRecent = async (reciterId, chapterIndex) => {
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
      <Header title="Recently played" />

      <IonContent className={styles.content}>
        <IonList className={styles.list}>
          {recent.length > 0 &&
            recent.map((item) => (
              <IonRouterLink
                key={item.id}
                className={styles.item}
                routerLink="/"
                onClick={() =>
                  handlePlayRecent(item.reciterId, item.chapterIndex)
                }
              >
                <div className={styles.inner}>
                  <div className={styles.left}>
                    <div className={styles.image}>
                      {/* <img src={`/img/reciters/${item.reciterImage}`} alt="" /> */}
                      <IonIcon
                        icon={musicalNoteOutline} //
                        slot="start"
                        className={styles.icon}
                      />
                    </div>
                    <div className={styles.label}>
                      <div className={styles.reciter}>{item.reciterName}</div>
                      <div className={styles.chapter}>{item.chapterName}</div>
                      <div className={styles.date}>
                        {formatDate(item.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* <div className={styles.btns}>
                    <div
                      className={styles.btn}
                      onClick={() =>
                        handlePlayRecent(item.reciterId, item.chapterIndex)
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

          {recent.length === 0 && (
            <h2 className={styles.no_record}>No record found!</h2>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RecentlyPlayed;
