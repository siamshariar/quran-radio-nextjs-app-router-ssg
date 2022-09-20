import { IonRouterLink } from "@ionic/react";
import classNames from "classnames";
import { PlayerStore, setReciter, setPlayerMini } from "../../store";
import styles from "./Reciter.module.css";

const Reciter = ({ reciter }) => {
  const reciterId = PlayerStore.useState((s) => s.reciterId);

  const handleReciterChange = () => {
    setPlayerMini(false);
    setReciter(reciter.reciter_id);
  };

  return (
    <div
      className={classNames(
        styles.card,
        reciterId === reciter.reciter_id ? styles.active : ""
      )}
    >
      <IonRouterLink
        className={styles.inner}
        onClick={() => handleReciterChange()}
        routerLink="/"
      >
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={`/img/reciters/${reciter.reciter_image}`} alt="" />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.name}>{reciter.reciter_name}</div>
          </div>
        </div>
      </IonRouterLink>
    </div>
  );
};

export default Reciter;
