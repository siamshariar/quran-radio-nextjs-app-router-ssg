"use client";

import { refreshOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { PlayerStore, setReciter, setChapterList, setChapter, setLiveRadio, setPlaying } from "@/store";
import { LocalStore } from "@/store/local";
import { liveRadios } from "@/data/liveRadios";

const RandomPlay = ({ classes = {} }) => {
	const reciters = PlayerStore.useState((s) => s.reciters);
	const liveIndex = PlayerStore.useState((s) => s.liveIndex);
	const mode = LocalStore.useState((s) => s.settings.mode);

	const playRandom = () => {
		if (mode === "normal") {
			const randomReciterIndex = Math.floor(Math.random() * reciters.length);
			const randomReciter = reciters[randomReciterIndex];
			const randomReciterId = randomReciter.id;

			const randomChapterList = randomReciter.moshaf[0].surah_list.split(",");
			const randomChapterIndex = Math.floor(
				Math.random() *
					(randomChapterList.length > 100 ? 100 : randomChapterList.length)
			);

			setReciter(randomReciterId);
			setChapterList(randomReciterId);
			setChapter(randomChapterList, randomChapterIndex);
		} else {
			let randomLiveIndex = Math.floor(Math.random() * liveRadios.length);
			if (liveRadios.length > 1 && randomLiveIndex === liveIndex) {
				randomLiveIndex = (randomLiveIndex + 1) % liveRadios.length;
			}
			setLiveRadio(randomLiveIndex);
		}

		setPlaying(true);
	};

	return (
		<div className={classes.root}>
			<div className={classes.btn} onClick={playRandom}>
				<IonIcon icon={refreshOutline} slot="start" class={classes.icon} />
			</div>
		</div>
	);
};

export default RandomPlay;
