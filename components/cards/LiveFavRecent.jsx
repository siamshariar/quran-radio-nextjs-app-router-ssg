import Link from "next/link";
import classNames from "classnames";
import { PlayerStore, setPlaying, setLiveSrc, setLiveRadio } from "@/store";
import { LocalStore } from "@/store/local";
import { trashOutline, playOutline, radioOutline } from "ionicons/icons";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";

const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  const LiveFavRecent = ({ item, handleRemoveLiveFavorite, handleRemoveLiveRecent, noRemoveIcon }) => {
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
		setLiveSrc(item.liveIndex);
		setPlaying(true);
	  }
	};
  
	const pause = () => {
	  setPlaying(false);
	};
  
	const handleRemove = () => {
	  if (handleRemoveLiveFavorite) {
		handleRemoveLiveFavorite(item);
	  } else if (handleRemoveLiveRecent) {
		handleRemoveLiveRecent(item);
	  }
	};
  
	return (
	  <div className={classNames(styles.card, styles.liveFavCard)}>
		<div className={styles.wrapper}>
		  <div className={styles.left}>
			<div className={styles.image}>
			  <IonIcon icon={radioOutline} slot="start" class={styles.icon} />
			</div>
		  </div>
  
		  <div className={styles.middle}>
			<div className={styles.name}>{item.name}</div>
			<div className={styles.meaning}>{item.place}</div>
			<div className={styles.timestamp}>{formatDate(item.createdAt)}</div>
		  </div>
  
		  <div className={classNames(styles.right, styles.btns)}>
			{!noRemoveIcon && (
			  <IonIcon
				icon={trashOutline}
				slot="start"
				class={styles.icon}
				onClick={handleRemove}
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