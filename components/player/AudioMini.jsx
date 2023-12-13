import classNames from "classnames";
import { PlayerStore, setPlaying, setPlayerMini } from "../../store";
import Tune from "../sections/TuneMini";
import { playCircle, pauseCircle } from "../../icons";
import styles from "./AudioMini.module.css";
import { IonIcon } from "@ionic/react";
import { LocalStore } from "@/store/local";
import Loader from "../utils/Loader";

const AudioMini = () => {
	const playing = PlayerStore.useState((s) => s.playing);
	const reciterImage = PlayerStore.useState((s) => s.reciterImage);
	const reciterName = PlayerStore.useState((s) => s.reciterName);
	const chapterName = PlayerStore.useState((s) => s.chapterName);
	const currLive = PlayerStore.useState((s) => s.currLive);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const loading = PlayerStore.useState((s) => s.loading);

	const play = () => {
		setPlaying(true);
	};

	const pause = () => {
		setPlaying(false);
	};

	return (
		<div className="page_width">
			<div className={styles.content}>
				{/* <IonIcon
        icon={upIcon}
        slot="start"
        className={styles.up_icon}
        // onClick={() => setPlayerMini(false)}
      /> */}
				<div className={styles.wrapper}>
					<div className={styles.left}>
						{/* <img src={`/img/reciters/${reciterImage}`} alt="" /> */}
						<Tune />
					</div>
					{mode === "normal" ? (
						<div className={styles.center}>
							<span>{chapterName}</span>
							<span>{reciterName}</span>
						</div>
					) : (
						<div className={styles.center}>
							<span>{currLive.name}</span>
							{/* <span>{reciterName}</span> */}
						</div>
					)}
					<div className={styles.right}>
						{loading ? (
							<Loader />
						) : playing ? (
							<div className={styles.btn} onClick={pause}>
								<IonIcon icon={playCircle} slot="start" class={styles.icon} />
							</div>
						) : (
							<div className={styles.btn} onClick={play}>
								<IonIcon icon={pauseCircle} slot="start" class={styles.icon} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AudioMini;
