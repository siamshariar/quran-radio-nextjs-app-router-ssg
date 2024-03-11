import Link from "next/link";
import { LocalStore } from "../../store/local";
import { PlayerStore } from "../../store";
import styles from "./Name.module.css";

const NameSection = () => {
	const mode = LocalStore.useState((s) => s.settings.mode);
	const chapterName = PlayerStore.useState((s) => s.chapterName);
	const chapterMeaning = PlayerStore.useState((s) => s.chapterMeaning);
	const reciterName = PlayerStore.useState((s) => s.reciterName);
	const currLive = PlayerStore.useState((s) => s.currLive);

	return (
		<div className={styles.wrapper}>
			{mode === "normal" && (
				<>
					<div className={styles.chapter}>
						<h2>Reciter - {reciterName}</h2>
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
					<div className={styles.chapter}>
						<h2>Live Radio</h2>
					</div>

					<div className={styles.reciter}>
						<span>{currLive.name}</span>
					</div>
				</>
			)}
		</div>
	);
};

export default NameSection;
