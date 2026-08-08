import {
	PlayerStore,
	setPlaying,
	setChapter,
	setReciterByReciter,
	setChapterListByList,
	setSrcAllChapters,
} from "@/store";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { LocalStore } from "@/store/local";
import { reciters } from "@/data/reciters";
import classNames from "classnames";

const AllChapter = ({ chapter, isLast }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const currentChapters = PlayerStore.useState((s) => s.chapterList);
	const currentReciter = PlayerStore.useState((s) => s.reciter);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const { setMode } = useSettingStorage();

	const chapterNoStr = chapter.chapterNo.toString();

	const getRandomReciter = () => {
		const randomReciterIndex = Math.floor(Math.random() * reciters.length);
		const reciter = reciters[randomReciterIndex];

		let moshaf = [];

		moshaf = reciter.moshaf.filter((i) => i.id == reciter.defaultMoshafId);

		let reciterData = {
			id: reciter.id,
			name: reciter.name,
			imgUrl: reciter.imgUrl
				? reciter.imgUrl
				: "/img/reciters/quran-reciting.jpg",
			moshaf: moshaf.length ? moshaf : [reciter.moshaf[0]],
		};

		return reciterData;
	};

	const changeMode = () => {
		if (mode === "live") {
			setMode("normal");
		}
	};

	let currReciter = currentReciter;

	const handleChapterChange = () => {
		let reciterChapList = currReciter.moshaf[0].surah_list.split(",");

		if (reciterChapList.includes(chapterNoStr)) {
			changeMode();
			setSrcAllChapters(chapterNoStr, currReciter.moshaf);
			setPlaying(true);
			setChapterListByList(reciterChapList);
			setChapter(reciterChapList, reciterChapList.indexOf(chapterNoStr));
			setReciterByReciter(currReciter);
			return;
		} else {
			currReciter = getRandomReciter();
			handleChapterChange();
		}
	};

	const play = () => {
		changeMode();
		setPlaying(true);
	};

	const pause = () => {
		setPlaying(false);
	};

	return (
		<div className={classNames(styles.card, isLast && styles.last)}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<div className={styles.image}>
						<div className={styles.number}>{chapter.chapterNo}</div>
					</div>
				</div>

				<div className={styles.middle}>
					<div className={styles.name}>{chapter.name}</div>
					<div className={styles.meaning}>{chapter.meaning}</div>
				</div>

				<div className={styles.right}>
					{currentChapters[chapterIndex] == chapter.chapterNo ? (
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
							class={styles.icon}
							onClick={handleChapterChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default AllChapter;
