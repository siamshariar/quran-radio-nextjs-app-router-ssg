import { PlayerStore } from "../../store";
import Pulse from "./PulseSecondary";
import styles from "./Content.module.css";

const Content = () => {
  const chapterName = PlayerStore.useState((s) => s.chapterName);
  const chapterMeaning = PlayerStore.useState((s) => s.chapterMeaning);
  const reciterName = PlayerStore.useState((s) => s.reciterName);
  const reciterImage = PlayerStore.useState((s) => s.reciterImage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bg}></div>
      <div className={styles.chapter}>
        <h2>
          {chapterName} ({chapterMeaning})
        </h2>
      </div>

      <div className={styles.reciter}>
        <span>{reciterName}</span>
      </div>

      <div className={styles.image}>
        <img src={`/img/reciters/${reciterImage}`} alt="reciter" />
        <Pulse />
      </div>
    </div>
  );
};

export default Content;
