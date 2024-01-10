import { useEffect, useState } from "react";
import { LocalStore } from "@/store/local";
import { useFavoriteStorage } from "@/hooks/useFavoriteStorage";
import { useLiveFavoriteStorage } from "@/hooks/useLiveFavoriteStorage";
import { checkIsFavorite, checkIsLiveFavorite } from "@/lib/check";
import { IonIcon } from "@ionic/react";
import { PlayerStore } from "@/store";

const Favorite = ({ reciterId, chapterNo, classes, icon }) => {
	const favorites = LocalStore.useState((s) => s.favorites);
	const liveFavorites = LocalStore.useState((s) => s.liveFavorites);
	const currLive = PlayerStore.useState((s) => s.currLive);
	const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
	const liveIndex = PlayerStore.useState((s) => s.liveIndex);
	const mode = LocalStore.useState((s) => s.settings.mode);

	const { addFavorite, removeFavorite } = useFavoriteStorage();
	const { addLiveFavorite, removeLiveFavorite } = useLiveFavoriteStorage();

	const [isFavorite, setIsFavorite] = useState(false);
	const [isLiveFavorite, setIsLiveFavorite] = useState(false);

	useEffect(() => {
		if (checkIsFavorite(favorites, reciterId, chapterNo)) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}
	}, [favorites, chapterNo, reciterId]);

	useEffect(() => {
		if (checkIsLiveFavorite(liveFavorites, currLive.id)) {
			setIsLiveFavorite(true);
		} else {
			setIsLiveFavorite(false);
		}
	}, [liveFavorites, currLive.id]);

	const handleAddFavorite = async () => {
		if (checkIsFavorite(favorites, reciterId, chapterNo)) {
			return;
		}
		await addFavorite(reciterId, chapterNo, chapterIndex);
		setIsFavorite(true);
		return;
	};

	const handleAddLiveFavorite = async () => {
		if (checkIsLiveFavorite(liveFavorites, currLive.id)) {
			return;
		}
		await addLiveFavorite(currLive, liveIndex);
		setIsLiveFavorite(true);
		return;
	};

	const handleRemoveFavorite = async () => {
		if (checkIsFavorite(favorites, reciterId, chapterNo)) {
			await removeFavorite(reciterId, chapterNo);
			setIsFavorite(false);
			return;
		}
		return;
	};

	const handleRemoveLiveFavorite = async () => {
		if (checkIsLiveFavorite(liveFavorites, currLive.id)) {
			await removeLiveFavorite(currLive);
			setIsLiveFavorite(false);
			return;
		}
		return;
	};

	return mode === "normal" ? (
		<div className={classes.root}>
			{isFavorite ? (
				<div
					className={`${classes.btn} ${classes.fav_added}`}
					onClick={() => handleRemoveFavorite()}>
					<IonIcon icon={icon.added} slot="start" class={classes.icon} />
				</div>
			) : (
				<div className={classes.btn} onClick={() => handleAddFavorite()}>
					<IonIcon icon={icon.removed} slot="start" class={classes.icon} />
				</div>
			)}
		</div>
	) : (
		<div className={classes.root}>
			{isLiveFavorite ? (
				<div
					className={`${classes.btn} ${classes.fav_added}`}
					onClick={() => handleRemoveLiveFavorite()}>
					<IonIcon icon={icon.added} slot="start" class={classes.icon} />
				</div>
			) : (
				<div className={classes.btn} onClick={() => handleAddLiveFavorite()}>
					<IonIcon icon={icon.removed} slot="start" class={classes.icon} />
				</div>
			)}
		</div>
	);
};

export default Favorite;
