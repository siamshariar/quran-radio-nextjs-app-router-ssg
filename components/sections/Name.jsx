import { PlayerStore } from "../../store";
import styles from "./Name.module.css";

const NameSection = () => {
  const chapterName = PlayerStore.useState((s) => s.chapterName);
  const chapterMeaning = PlayerStore.useState((s) => s.chapterMeaning);
  const reciterName = PlayerStore.useState((s) => s.reciterName);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chapter}>
        <h2>
          {chapterName} ({chapterMeaning})
        </h2>
      </div>

      <div className={styles.reciter}>
        <span>{reciterName} hello</span>
      </div>
    </div>
  );
};

export default NameSection;
