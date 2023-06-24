import Link from "next/link";
import classNames from "classnames";
import { chevronBack, search } from "@/icons";
import { PlayerStore } from "@/store";
import ReciterCard from "@/components/cards/Reciter";
import styles from "./Pages.module.css";

const Reciters = () => {
  const reciters = PlayerStore.useState((s) => s.reciters);

  return (
    <div className={styles.panel_content}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.nav_left}>
            <Link href="/">
              <ion-button class={styles.back} fill="clear">
                <ion-icon icon={chevronBack} slot="start" class={styles.icon} />
              </ion-button>
            </Link>
          </div>

          <div className={styles.nav_text}>Reciters</div>
          <div className={styles.nav_left}></div>
        </div>

        <div className={styles.search}>
          <ion-icon icon={search} slot="start" class={styles.s_icon} />
          <input type="text" name="search" placeholder="Search" />
        </div>

        <div className={styles.content}>
          {reciters &&
            reciters.map((reciter, index) => (
              <ReciterCard key={index} reciter={reciter} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reciters;
