import { useEffect } from 'react';
import { PlayerStore } from '../store';
import { LocalStore, setLiveFavorites } from '../store/local';
import storage from '@/store/storage';

const STORE_KEY = 'liveFavorites';

export const useLiveFavoriteStorage = () => {
  const liveFavorites = LocalStore.useState((s) => s.liveFavorites);
  const liveRadios = PlayerStore.useState((s) => s.liveRadios);

  useEffect(() => {
    const loadLiveFavorites = async () => {
      try {
        const storedLiveFavorites = await storage.get(STORE_KEY);
        if (storedLiveFavorites) {
          setLiveFavorites(storedLiveFavorites);
        }
      } catch (error) {
        console.error("Error loading live favorites:", error);
      }
    };
    loadLiveFavorites();
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
		await storage.set(STORE_KEY, updatedFavorites).catch((error) => {
      console.error("Error saving live favorite:", error);
		});
	};

	const removeLiveFavorite = async (currLive) => {
		let updated = liveFavorites.filter((item) => item.id !== currLive.id);
		setLiveFavorites(updated);
		await storage.set(STORE_KEY, updated).catch((error) => {
      console.error("Error removing live favorite:", error);
		});
	};

	return {
		addLiveFavorite,
		removeLiveFavorite,
  };
};
