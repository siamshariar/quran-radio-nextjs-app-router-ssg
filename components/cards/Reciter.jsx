import Link from "next/link";
import classNames from "classnames";
import {
	PlayerStore,
	setReciter,
	setChapter,
	setPlaying,
	setSrc,
	setReciterByReciter,
	setChapterListByList,
} from "@/store";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { LocalStore } from "@/store/local";
import Image from "next/image";

const Reciter = ({ reciter }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const reciterId = PlayerStore.useState((s) => s.reciterId);
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

		const reciterId = reciter.id;
		const chapterList = reciter.moshaf[0].surah_list.split(",");
		const randomChapterIndex = Math.floor(Math.random() * chapterList.length);

		// update reciter from json
		// setReciter(reciterId);
		// update reciter from pages props reciter
		setSrc(chapterList, reciterId, randomChapterIndex);
		setPlaying(true);
		setReciterByReciter(reciter);
		setChapter(chapterList, randomChapterIndex);
		setChapterListByList(chapterList);
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
		<div
			className={classNames(
				styles.card,
				reciterId === reciter.id ? styles.active : "",
				styles.reciters
			)}
			id={reciter.id}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<Link href={`/reciters/${reciter.id}`}>
						<div className={styles.image}>
							{/* <img src={`/img/reciters/${reciter.reciter_image}`} alt="" /> */}
							<Image
								src={reciter.imgUrl}
								alt=""
								width={100}
								height={100}
								loading="eager"
								unoptimized
							/>
						</div>
					</Link>
				</div>

				<Link href={`/reciters/${reciter.id}`} className={styles.middle}>
					<div className={styles.name}>{reciter.name}</div>
					<div className={styles.meaning}>
						- Recited sura {reciter.moshaf[0].surah_list.split(",").length}
					</div>
				</Link>

				<div className={styles.right}>
					{reciterId === reciter.id &&
						(playing && mode === "normal" ? (
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
						))}
					{reciterId !== reciter.id && (
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

export default Reciter;
