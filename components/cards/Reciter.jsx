import Link from "next/link";
import classNames from "classnames";
import {
	PlayerStore,
	setReciter,
	setChapter,
	setChapterList,
	setPlaying,
	setSrc,
} from "@/store";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { LocalStore } from "@/store/local";

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
			// setPlaybackMode("normal");
		}

		const reciterId = reciter.id;
		const chapterList = reciter.moshaf[0].surah_list.split(",");
		const randomChapterIndex = Math.floor(Math.random() * chapterList.length);
		setReciter(reciterId);
		setChapter(chapterList, randomChapterIndex);
		setChapterList(reciterId);
		setSrc(chapterList, reciterId, randomChapterIndex);
		setPlaying(true);
	};

	const play = () => {
		if (mode === "live") {
			// setPlaybackMode("normal");
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
