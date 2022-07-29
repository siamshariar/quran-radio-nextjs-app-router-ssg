import { Link } from "react-router-dom";
import { PlayerStore } from "../../store";
import styles from "./Content.module.css";

const Content = () => {
  const chapterName = PlayerStore.useState((s) => s.chapterName);
  const chapterMeaning = PlayerStore.useState((s) => s.chapterMeaning);
  const reciterName = PlayerStore.useState((s) => s.reciterName);
  const reciterImage = PlayerStore.useState((s) => s.reciterImage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chapter}>
        <h2>
          <Link to="/chapters">
            {chapterName} ({chapterMeaning})
          </Link>
        </h2>
      </div>

      <div className={styles.reciter}>
        <span>
          <Link to="/reciters">{reciterName}</Link>
        </span>
      </div>

      <div className={styles.image}>
        {/* <img src={`/img/reciters/${reciterImage}`} alt="reciter" /> */}
        <img src={`/img/bg.png`} alt="reciter" />
      </div>
    </div>
  );
};

export default Content;
