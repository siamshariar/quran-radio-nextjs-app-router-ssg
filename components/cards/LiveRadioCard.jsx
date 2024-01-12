import classNames from "classnames";
import { PlayerStore, setPlaying, setLiveRadio, setLiveSrc } from "@/store";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { LocalStore } from "@/store/local";

const LiveRadioCard = ({ liveRadio, index }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const currLive = PlayerStore.useState((s) => s.currLive);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const { setMode } = useSettingStorage();

	const handlePlay = () => {
		if (mode === "normal") {
			setMode("live");
		}
		if (currLive.id === liveRadio.id) {
			setPlaying(true);
		} else {
			setLiveRadio(index);
			// update liveSrc and playing at same time to avoid 2 effects from Audio.jsx
			setLiveSrc(index);
			setPlaying(true);
		}
	};

	const pause = () => {
		setPlaying(false);
	};

	return (
		<div
			className={classNames(
				styles.card,
				currLive.id === liveRadio.id ? styles.active : ""
			)}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<div className={styles.image}>
						<div className={styles.number}>{liveRadio.id}</div>
					</div>
				</div>

				<div className={styles.middle}>
					<div className={styles.name}>{liveRadio.name}</div>
					<div className={styles.meaning}>{liveRadio.place}</div>
				</div>

				<div className={styles.right}>
					{playing && mode === "live" && currLive.id === liveRadio.id ? (
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
							onClick={handlePlay}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default LiveRadioCard;
