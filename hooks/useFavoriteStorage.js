import { useEffect } from 'react';
import { PlayerStore } from '../store';
import { LocalStore, setFavorites } from '../store/local';
import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';

const STORE_KEY = "favorites";

let storage;

const initStorage = async () => {
  storage = new Storage({
    name: '__mydb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });
  await storage.create();
};

export const useFavoriteStorage = () => {
  const favorites = LocalStore.useState((s) => s.favorites);
  const chapters = PlayerStore.useState((s) => s.chapters);
  const reciters = PlayerStore.useState((s) => s.reciters);
  const chapterList = PlayerStore.useState((s) => s.chapterList);

  useEffect(() => {
    const fetchFavorites = async () => {
      await initStorage();
      const storedFavorites = await storage.get(STORE_KEY);
      if (storedFavorites && typeof storedFavorites === 'string') {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Failed to parse stored favorites:", error);
        }
      }
    };
    fetchFavorites();
  }, []);

	const addFavorite = async (reciterId, chapterNo, chapterIndex) => {
    await initStorage();
		const reciter = reciters.find((obj) => obj.id == reciterId);
		// console.log(reciterId, chapterNo);

		const newFavorite = {
			// id: "" + new Date().getTime(),
			reciterId: reciterId,
			reciterName: reciter.name,
			reciterImage: reciter.imgUrl,
			chapterIndex: chapterIndex,
			chapterList: chapterList,
			chapterNo: chapterNo,
			chapterName: chapters[chapterNo - 1].name,
			createdAt: new Date().getTime(),
			// status: 1,
		};

		const updatedFavorites = [...favorites, newFavorite];
		setFavorites(updatedFavorites);
		await storage.set(STORE_KEY, JSON.stringify(updatedFavorites));
	};

	const removeFavorite = async (reciterId, chapterNo) => {
		await initStorage();
		let updated = favorites.filter(
			(item) => item.reciterId !== reciterId || item.chapterNo !== chapterNo
		);
		setFavorites(updated);
		await storage.set(STORE_KEY, JSON.stringify(updated));
	};

  return {
    addFavorite,
    removeFavorite,
  };
};
