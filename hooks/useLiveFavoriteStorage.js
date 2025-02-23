import { useEffect } from 'react';
import { PlayerStore } from '../store';
import { LocalStore, setLiveFavorites } from '../store/local';
import storage from '@/store/storage';

const STORE_KEY = "liveFavorites";

export const useLiveFavoriteStorage = () => {
  const liveFavorites = LocalStore.useState((s) => s.liveFavorites);
  const liveRadios = PlayerStore.useState((s) => s.liveRadios);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await storage.getItem(STORE_KEY);
      if (storedFavorites && typeof storedFavorites === 'string') {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);
          setLiveFavorites(parsedFavorites);
        } catch (error) {
          console.error("Failed to parse stored favorites:", error);
        }
      }
    };
    fetchFavorites();
  }, []);

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
		await storage.setItem(STORE_KEY, JSON.stringify(updatedFavorites));
	};

	const removeLiveFavorite = async (currLive) => {
		let updated = liveFavorites.filter((item) => item.id !== currLive.id);
		setLiveFavorites(updated);
		await storage.setItem(STORE_KEY, JSON.stringify(updated));
	};

	return {
		addLiveFavorite,
		removeLiveFavorite,
  };
};
