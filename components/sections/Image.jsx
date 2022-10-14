import { PlayerStore } from "../../store";
import Pulse from "../utils/PulseSecondary";
import styles from "./Image.module.css";

const Image = () => {
  const reciterImage = PlayerStore.useState((s) => s.reciterImage);
  const playing = PlayerStore.useState((s) => s.playing);

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={`/img/reciters/${reciterImage}`} alt="reciter" />
        {playing && <Pulse />}
      </div>
    </div>
  );
};

export default Image;
