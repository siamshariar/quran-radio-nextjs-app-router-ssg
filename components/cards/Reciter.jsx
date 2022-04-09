import styles from "./Reciter.module.css";

const Reciter = ({ reciter, reciterId, setReciterId }) => {
  const handleReciterChange = () => {
    setReciterId(reciter.id);
  };

  return (
    <div
      className={
        reciterId === reciter.id
          ? `${styles.card} ${styles.active}`
          : styles.card
      }
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
