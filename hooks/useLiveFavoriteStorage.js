import { useEffect } from 'react';
import { PlayerStore } from '../store';
import { LocalStore, setLiveFavorites } from '../store/local';
import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';

const STORE_KEY = "liveFavorites";

let storage;

const initStorage = async () => {
  storage = new Storage({
    name: '__mydb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });
  await storage.create();
};

export const useLiveFavoriteStorage = () => {
  const liveFavorites = LocalStore.useState((s) => s.liveFavorites);
  const liveRadios = PlayerStore.useState((s) => s.liveRadios);

  useEffect(() => {
    const fetchFavorites = async () => {
      await initStorage();
      const storedFavorites = await storage.get(STORE_KEY);
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
		await initStorage();
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
		await storage.set(STORE_KEY, JSON.stringify(updatedFavorites));
	};

	const removeLiveFavorite = async (currLive) => {
		await initStorage();
		let updated = liveFavorites.filter((item) => item.id !== currLive.id);
		setLiveFavorites(updated);
		await storage.set(STORE_KEY, JSON.stringify(updated));
	};

	return {
		addLiveFavorite,
		removeLiveFavorite,
  };
};
