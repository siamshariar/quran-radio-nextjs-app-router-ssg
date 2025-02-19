import { useState } from 'react';
import { LocalStore, setLiveFavorites } from '../store/local';
import storage from '@/store/storage';

const STORE_KEY = 'liveFavorites';

export const useLiveFavoriteStorage = () => {
	const [liveFavorites, setLiveFavoritesState] = useState([]);

	const loadLiveFavorites = async () => {
		const storedFavorites = await storage.get(STORE_KEY);
		if (storedFavorites) {
		setLiveFavoritesState(storedFavorites);
		setLiveFavorites(storedFavorites);
		}
	};

	const addLiveFavorite = async (currLive, liveIndex) => {
		const newFavorite = {
			id: currLive.id,
			liveIndex: liveIndex,
			name: currLive.name,
			liveUrl: currLive.liveUrl,
			logo: currLive.logo,
			createdAt: new Date().getTime()
		};

		const updatedFavorites = [...liveFavorites, newFavorite];
		setLiveFavoritesState(updatedFavorites);
		setLiveFavorites(updatedFavorites);
		await storage.set(STORE_KEY, updatedFavorites);
	};

	const removeLiveFavorite = async (currLive) => {
		let updated = liveFavorites.filter((item) => item.id !== currLive.id);
		setLiveFavoritesState(updated);
		setLiveFavorites(updated);
		await storage.set(STORE_KEY, updated);
	};

	return {
		liveFavorites,
		loadLiveFavorites,
		addLiveFavorite,
		removeLiveFavorite
	};
};
