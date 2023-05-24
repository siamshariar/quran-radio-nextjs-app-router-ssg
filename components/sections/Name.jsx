import Link from "next/link";
import { LocalStore } from "../../store/local";
import { PlayerStore } from "../../store";
import styles from "./Name.module.css";

const NameSection = () => {
  const mode = LocalStore.useState((s) => s.settings.mode);
  const chapterName = PlayerStore.useState((s) => s.chapterName);
  const chapterMeaning = PlayerStore.useState((s) => s.chapterMeaning);
  const reciterName = PlayerStore.useState((s) => s.reciterName);

  return (
    <div className={styles.wrapper}>
      {mode === "normal" && (
        <>
          <div className={styles.chapter}>
            <h2>
              <Link href="/reciters">
                <a>Reciter - {reciterName}</a>
              </Link>
            </h2>
          </div>

          <div className={styles.reciter}>
            <span>
              {chapterName} ({chapterMeaning})
            </span>
          </div>
        </>
      )}

      {mode === "live" && (
        <>
          <h2>Now Playing</h2>
          <h1>LIVE RADIO</h1>
        </>
      )}
    </div>
  );
};

export default NameSection;
