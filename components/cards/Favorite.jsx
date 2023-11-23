import Link from "next/link";
import classNames from "classnames";
import {
	PlayerStore,
	setReciter,
	setChapter,
	setChapterList,
	// setPlaying,
	setPlayerMini,
} from "@/store";
import { LocalStore } from "@/store/local";
import { useFavoriteStorage } from "@/hooks/useFavoriteStorage";
import { checkIsFavorite } from "@/lib/check";
import { trashOutline, playOutline } from "ionicons/icons";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";

const Favorite = ({ item }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const reciterId = PlayerStore.useState((s) => s.reciterId);

	const currentReciterId = PlayerStore.useState((s) => s.reciterId);
	const currentChapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const { removeFavorite } = useFavoriteStorage();

	const handleRemoveFavorite = async (e, reciterId, chapterIndex) => {
		// e.preventDefault();
		setPlayerMini(true);

		if (checkIsFavorite(favorites, reciterId, chapterIndex)) {
			await removeFavorite(reciterId, chapterIndex);
			return;
		}
		return;
	};

	const handlePlayFavorite = async (reciterId, chapterIndex) => {
		setPlayerMini(false);
		if (
			reciterId === currentReciterId &&
			chapterIndex === currentChapterIndex
		) {
			return;
		}
		setReciter(reciterId);
		setChapter(chapterIndex);
		return;
	};

	// const handleReciterChange = () => {
	//   if (reciterId === reciter.id) {
	//     return;
	//   } else {
	//     const reciterId = reciter.id;
	//     const chapterList = reciter.moshaf[0].surah_list.split(",");
	//     const randomChapterIndex = Math.floor(Math.random() * chapterList.length);
	//     setReciter(reciterId);
	//     setChapter(chapterList, randomChapterIndex);
	//     setChapterList(reciterId);
	//     // setPlaying(true);
	//   }
	// };

	return (
		<div
			className={classNames(
				styles.card,
				styles.fav_card
				// reciterId === reciter.id ? styles.active : ""
			)}
			// onClick={() => handlePlayFavorite(item.reciterId, item.chapterIndex)}
		>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<div className={styles.image}>
						<img
							src="/img/reciters/mishary-rashid-alafasy-profile.webp"
							alt=""
						/>
					</div>
				</div>

				<div className={styles.middle}>
					<div className={styles.name}>{item.reciterName}</div>
					<div className={styles.meaning}>- {item.chapterName}</div>
				</div>

				<div className={classNames(styles.right, styles.btns)}>
					<IonIcon
						icon={trashOutline}
						slot="start"
						class={styles.icon}
						// onClick={(e) =>
						//   handleRemoveFavorite(e, item.reciterId, item.chapterIndex)
						// }
					/>
					<IonIcon
						icon={playOutline}
						slot="start"
						class={styles.icon}
						// onClick={() =>
						//   handlePlayFavorite(item.reciterId, item.chapterIndex)
						// }
					/>
				</div>
			</div>
		</div>
	);
};

export default Favorite;
