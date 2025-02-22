import { useEffect } from 'react';
import { PlayerStore } from '../store';
import { LocalStore, setFavorites } from '../store/local';
import storage from '@/store/storage';

const STORE_KEY = 'favorites';

export const useFavoriteStorage = () => {
  const favorites = LocalStore.useState((s) => s.favorites);
  const chapters = PlayerStore.useState((s) => s.chapters);
  const reciters = PlayerStore.useState((s) => s.reciters);
  const chapterList = PlayerStore.useState((s) => s.chapterList);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await storage.get(STORE_KEY);
        if (storedFavorites) {
          setFavorites(storedFavorites);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

	const addFavorite = async (reciterId, chapterNo, chapterIndex) => {
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
		await storage.set(STORE_KEY, updatedFavorites).catch((error) => {
			console.error("Error saving favorite:", error);
		});
	};

	const removeFavorite = async (reciterId, chapterNo) => {
		let updated = favorites.filter(
			(item) => item.reciterId !== reciterId || item.chapterNo !== chapterNo
		);
		setFavorites(updated);
		await storage.set(STORE_KEY, updated).catch((error) => {
      console.error("Error removing favorite:", error);
		});
	};

  return {
    addFavorite,
    removeFavorite,
  };
};
