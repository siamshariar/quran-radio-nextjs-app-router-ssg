"use client";

import {
	timeOutline,
	bookmark,
	bookmarkOutline,
	musicalNoteOutline,
	heart,
	heartOutline,
	time,
} from "ionicons/icons";

import { PlayerStore } from "@/store";
import {
	starOutline,
	shareOutline,
	clockOutline,
	ellipsisVertical,
} from "../../icons";

import styles from "./ButtonGroup.module.css";
import Favorite from "../actions/Favorite";
import PlaybackRate from "../actions/PlaybackRate";
import { IonIcon } from "@ionic/react";
import Share from "../actions/share";
import { LocalStore } from "@/store/local";
// import { server } from "@/lib/config";
import Timer from "../actions/TimerPrimary";
import { usePathname, useSearchParams } from "next/navigation";

const Buttons = () => {
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const chapterList = PlayerStore.useState((s) => s.chapterList);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const chapterNo = chapterList[chapterIndex];
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const queryString = searchParams.toString();
	const asPath = queryString ? `${pathname}?${queryString}` : pathname;

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
			<Share Icon={ShareIcon} url={asPath} title="Quran Radio" />
			<Timer
				classes={{
					root: styles.item,
					btn: styles.btn,
					icon: styles.icon,
				}}
				icon={{
					added: time,
					removed: timeOutline,
				}}
			/>
			<PlaybackRate
				classes={{
					root: styles.item,
					btn: styles.btn,
					icon: styles.icon,
				}}
				icon={ellipsisVertical}
				mode={mode}
			/>
		</div>
	);
};

export default Buttons;
