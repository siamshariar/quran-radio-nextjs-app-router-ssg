import { PlayerStore } from "../store";
import { LocalStore, setFavorites, setLiveFavorites } from "../store/local";

const STORE_KEY = "liveFavorites";

export const useLiveFavoriteStorage = () => {
	const liveFavorites = LocalStore.useState((s) => s.liveFavorites);
	const liveRadios = PlayerStore.useState((s) => s.liveRadios);

	const addLiveFavorite = async (currLive, liveIndex) => {
		const newFavorite = {
			id: currLive.id,
			liveIndex: liveIndex,
			name: currLive.name,
			liveUrl: currLive.liveUrl,
			logo: currLive.logo,
			createdAt: new Date().getTime(),
		};

		const updatedFavorites = [...liveFavorites, newFavorite];
		setLiveFavorites(updatedFavorites);
		localStorage.setItem(STORE_KEY, JSON.stringify(updatedFavorites));
	};

	const removeLiveFavorite = async (currLive) => {
		let updated = liveFavorites.filter((item) => item.id !== currLive.id);
		setLiveFavorites(updated);
		localStorage.setItem(STORE_KEY, JSON.stringify(updated));
	};

	return {
		addLiveFavorite,
		removeLiveFavorite,
	};
};
