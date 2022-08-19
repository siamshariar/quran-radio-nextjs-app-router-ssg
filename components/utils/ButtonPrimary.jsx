import styles from "./ButtonPrimary.module.css";

const Button = ({ icon, size }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{""}</div>
    </div>
  );
};

export default Button;
