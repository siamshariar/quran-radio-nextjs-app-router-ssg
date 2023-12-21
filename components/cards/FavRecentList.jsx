import classNames from "classnames";
import {
	PlayerStore,
	setReciter,
	setChapter,
	setChapterList,
	setSrc,
	setPlaying,
} from "@/store";
import { LocalStore } from "@/store/local";
import { trashOutline } from "ionicons/icons";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";

const FavRecentList = ({ item, handleRemoveFavorite, noRemoveIcon }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const mode = LocalStore.useState((s) => s.settings.mode);

	const { setMode } = useSettingStorage();

	const setPlaybackMode = async (mode) => {
		await setMode(mode);
		return;
	};

	const handleReciterChange = () => {
		if (mode === "live") {
			setPlaybackMode("normal");
		}

		setReciter(item.reciterId);
		setChapterList(item.reciterId);
		setChapter(item.chapterList, item.chapterIndex);
		setSrc(item.chapterList, item.reciterId, item.chapterIndex);
		setPlaying(true);
	};

	const play = () => {
		if (mode === "live") {
			setPlaybackMode("normal");
		}
		setPlaying(true);
	};

	const pause = () => {
		setPlaying(false);
	};

	return (
		<div className={classNames(styles.card, styles.fav_card)}>
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
					{!noRemoveIcon && (
						<IonIcon
							icon={trashOutline}
							slot="start"
							class={styles.icon}
							onClick={() =>
								handleRemoveFavorite(item.reciterId, item.chapterNo)
							}
						/>
					)}
					{reciterId === item.reciterId &&
					item.chapterIndex === chapterIndex ? (
						playing && mode === "normal" ? (
							<IonIcon
								icon={playCircle}
								slot="start"
								className={styles.icon}
								onClick={pause}
							/>
						) : (
							<IonIcon
								icon={pauseCircle}
								slot="start"
								className={styles.icon}
								onClick={play}
							/>
						)
					) : (
						<IonIcon
							icon={pauseCircle}
							slot="start"
							className={styles.icon}
							onClick={() => handleReciterChange()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default FavRecentList;
