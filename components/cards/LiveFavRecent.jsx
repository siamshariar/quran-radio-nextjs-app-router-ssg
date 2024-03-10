import Link from "next/link";
import classNames from "classnames";
import { PlayerStore, setPlaying, setLiveSrc, setLiveRadio } from "@/store";
import { LocalStore } from "@/store/local";
import { trashOutline, playOutline } from "ionicons/icons";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import RadioIcon from "@mui/icons-material/Radio";

const LiveFavRecent = ({ item, handleRemoveLiveFavorite, noRemoveIcon }) => {
	const playing = PlayerStore.useState((s) => s.playing);
	const currLive = PlayerStore.useState((s) => s.currLive);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const { setMode } = useSettingStorage();

	const handlePlay = () => {
		if (mode === "normal") {
			setMode("live");
		}
		if (currLive.id === item.id) {
			setPlaying(true);
		} else {
			setLiveRadio(item.liveIndex);
			// update liveSrc and playing at same time to avoid 2 effects from Audio.jsx
			setLiveSrc(item.liveIndex);
			setPlaying(true);
		}
	};

	const pause = () => {
		setPlaying(false);
	};

	return (
		<div className={classNames(styles.card, styles.liveFavCard)}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<div className={styles.image}>
						{/* <div className={styles.number}>{item.id}</div> */}
						<RadioIcon />
					</div>
				</div>

				<div className={styles.middle}>
					<div className={styles.name}>{item.name}</div>
					<div className={styles.meaning}>{item.place}</div>
				</div>

				<div className={classNames(styles.right, styles.btns)}>
					{!noRemoveIcon && (
						<IonIcon
							icon={trashOutline}
							slot="start"
							class={styles.icon}
							onClick={() => handleRemoveLiveFavorite(item)}
						/>
					)}
					{playing && mode === "live" && currLive.id === item.id ? (
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

export default LiveFavRecent;
