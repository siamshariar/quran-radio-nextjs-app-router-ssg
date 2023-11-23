import Link from "next/link";
import classNames from "classnames";
import {
	PlayerStore,
	setReciter,
	setChapter,
	setChapterList,
	// setPlaying,
} from "@/store";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";

const Reciter = ({ reciter }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const reciterId = PlayerStore.useState((s) => s.reciterId);

	const handleReciterChange = () => {
		if (reciterId === reciter.id) {
			return;
		} else {
			const reciterId = reciter.id;
			const chapterList = reciter.moshaf[0].surah_list.split(",");
			const randomChapterIndex = Math.floor(Math.random() * chapterList.length);
			setReciter(reciterId);
			setChapter(chapterList, randomChapterIndex);
			setChapterList(reciterId);
			// setPlaying(true);
		}
	};

	return (
		<div
			className={classNames(
				styles.card,
				reciterId === reciter.id ? styles.active : ""
			)}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<div className={styles.image}>
						{/* <img src={`/img/reciters/${reciter.reciter_image}`} alt="" /> */}
						<img
							src="/img/reciters/mishary-rashid-alafasy-profile.webp"
							alt=""
						/>
					</div>
				</div>

				<Link href={`/reciters/${reciter.id}`} className={styles.middle}>
					<div className={styles.name}>{reciter.name}</div>
					<div className={styles.meaning}>
						- Recited sura {reciter.moshaf[0].surah_list.split(",").length}
					</div>
				</Link>

				<div className={styles.right}>
					{reciterId === reciter.id && playing && (
						<IonIcon icon={playCircle} slot="start" class={styles.icon} />
					)}
					{(reciterId !== reciter.id || !playing) && (
						<IonIcon
							icon={pauseCircle}
							slot="start"
							class={styles.icon}
							onClick={() => handleReciterChange()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Reciter;
