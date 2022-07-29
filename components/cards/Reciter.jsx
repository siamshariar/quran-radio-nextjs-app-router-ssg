import classNames from "classnames";
import { PlayerStore, setReciter } from "../../store";
import styles from "./Reciter.module.css";

const Reciter = ({ reciter }) => {
  const reciterId = PlayerStore.useState((s) => s.reciterId);

  const handleReciterChange = () => {
    setReciter(reciter.id);
  };

  return (
    <div
      className={classNames(
        styles.card,
        reciterId === reciter.id ? styles.active : ""
      )}
    >
      <div className={styles.inner} onClick={() => handleReciterChange()}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img src={`/img/reciters/${reciter.reciter_image}`} alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{reciter.reciter_name}</div>
        </div>
      </div>
    </div>
  );
};

export default Reciter;
