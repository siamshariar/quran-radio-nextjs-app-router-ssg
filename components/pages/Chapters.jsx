import Link from "next/link";
import classNames from "classnames";
import { PlayerStore } from "@/store";
import { chevronBack, search } from "@/icons";
import ChapterCard from "@/components/cards/Chapter";
import styles from "./Pages.module.css";

// const ChapterList = ({ match }) => {
const ChapterListPage = ({ reciter, chapterList }) => {
  // const slug = match.params.slug;

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

          <div className={styles.nav_text}>Chapters</div>
          <div className={styles.nav_left}></div>
        </div>

        <div className={styles.reciter}>
          <div className={styles.reciter_name}>
            <span>{reciter.name}</span>
          </div>
          <div className={styles.image}>
            <img
              src="/img/reciters/Abdul-Basit-Abdus-Samad.jpg"
              alt="reciter"
            />
          </div>
        </div>

        <div className={styles.content}>
          {chapterList &&
            chapterList.length &&
            chapterList.map((chapterNo, index) => (
              <ChapterCard
                key={chapterNo}
                index={index}
                reciterId={reciter.id}
                chapterNo={chapterNo}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterListPage;
