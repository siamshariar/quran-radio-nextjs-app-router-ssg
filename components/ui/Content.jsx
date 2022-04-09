import styles from "./Content.module.css";

const Content = ({ setChapterModalOpen, setReciterModalOpen, info }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chapter}>
        <h2 onClick={() => setChapterModalOpen(true)}>
          {info.chapter.name} ({info.chapter.meaning})
        </h2>
      </div>

      <div className={styles.reciter}>
        <span onClick={() => setReciterModalOpen(true)}>
          {info.reciter.name}
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
