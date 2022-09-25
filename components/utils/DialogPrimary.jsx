import classNames from "classnames";
import styles from "./DialogPrimary.module.css";

const DialogPrimary = ({ children, isOpen, closer }) => {
  return (
    <div className={classNames(styles.dialog, isOpen ? styles.open : "")}>
      <div className={styles.backdrop} onClick={() => closer()}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DialogPrimary;
