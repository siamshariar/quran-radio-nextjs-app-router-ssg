import Link from "next/link";
import classNames from "classnames";
import { PlayerStore } from "@/store";
import { chevronBack, search } from "@/icons";
import ChapterCard from "@/components/cards/Chapter";
import styles from "./Pages.module.css";
import { IonButton, IonIcon } from "@ionic/react";
import CommonHeader from "../sections/CommonHeader";

// const ChapterList = ({ match }) => {
const ChapterListPage = ({ reciter, chapterList }) => {
	// const slug = match.params.slug;

	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
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
								reciter={reciter}
								chapterNo={chapterNo}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default ChapterListPage;
