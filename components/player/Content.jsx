import styles from "./Content.module.css";
import { Link } from "react-router-dom";

const Content = ({ setChapterModalOpen, setReciterModalOpen, info }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chapter}>
        <h2>
          <Link to="/chapters">
            {info.chapter.name} {info.chapter.meaning}
          </Link>
        </h2>
      </div>

      <div className={styles.reciter}>
        <span>
          <Link to="/reciters">{info.reciter.name}</Link>
        </span>
      </div>

      <div className={styles.image}>
        {/* <img src={`/img/reciters/${info.reciter.image}`} alt="reciter" /> */}
        <img src={`/img/bg.png`} alt="reciter" />
      </div>
    </div>
  );
};

export default Content;
