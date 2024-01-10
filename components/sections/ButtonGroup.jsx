import {
	timeOutline,
	bookmark,
	bookmarkOutline,
	musicalNoteOutline,
	heart,
	heartOutline,
} from "ionicons/icons";

import { PlayerStore } from "@/store";
import { starOutline, shareOutline, clockOutline } from "../../icons";

import styles from "./ButtonGroup.module.css";
import Favorite from "../actions/Favorite";
import PlaybackRate from "../actions/PlaybackRate";
import { IonIcon } from "@ionic/react";
import Share from "../actions/share";
import { LocalStore } from "@/store/local";
import { server } from "@/lib/config";

const Buttons = () => {
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const chapterList = PlayerStore.useState((s) => s.chapterList);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const chapterNo = chapterList[chapterIndex];
	const currLive = PlayerStore.useState((s) => s.currLive);

	const ShareIcon = () => (
		<IonIcon icon={shareOutline} slot="start" class={styles.icon} />
	);

	return (
		<div className={styles.content}>
			<Favorite
				reciterId={reciterId}
				chapterNo={chapterNo}
				classes={{
					root: styles.item,
					btn: styles.btn,
					icon: styles.icon,
					fav_added: styles.fav_added,
				}}
				icon={{
					added: heart,
					removed: heartOutline,
				}}
			/>
			<Share
				Icon={ShareIcon}
				url={
					mode === "normal"
						? `/reciters/${reciterId}/chapters/${chapterNo}`
						: `/live-radios/${currLive.id}`
				}
				title="Quran Radio"
			/>
			{/* <Timer
        classes={{
          root: styles.item,
          btn: styles.btn,
          icon: styles.icon,
        }}
        icon={{
          added: time,
          removed: timeOutline,
        }}
      /> */}
			<PlaybackRate
				classes={{
					root: styles.item,
					btn: styles.btn,
					icon: styles.icon,
				}}
				icon={clockOutline}
			/>
		</div>
	);
};

export default Buttons;
