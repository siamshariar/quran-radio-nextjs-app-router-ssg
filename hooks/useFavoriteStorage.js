import { useState } from 'react';
import { LocalStore, setFavorites } from '../store/local';
import storage from '@/store/storage';
import { chapters } from '../data/chapters';
import { reciters } from '../data/reciters';

const STORE_KEY = 'favorites';

export const useFavoriteStorage = () => {
	const [favorites, setFavoritesState] = useState([]);

	const loadFavorites = async () => {
		const storedFavorites = await storage.get(STORE_KEY);
		if (storedFavorites) {
		setFavoritesState(storedFavorites);
		setFavorites(storedFavorites);
		}
	};

	const addFavorite = async (reciterId, chapterNo, chapterIndex) => {
		const reciter = reciters.find((obj) => obj.id == reciterId);
		const chapterList = reciter.moshaf[0].surah_list.split(',');
		// console.log(reciterId, chapterNo);

		const newFavorite = {
			// id: "" + new Date().getTime(),
			reciterId: reciterId,
			// reciterSlug: "",
			reciterName: reciter.name,
			reciterImage: reciter.imgUrl,
			chapterIndex: chapterIndex,
			chapterList: chapterList,
			chapterNo: chapterNo,
			chapterName: chapters[chapterNo - 1].name,
			createdAt: new Date().getTime()
			// status: 1,
		};

		const updatedFavorites = [...favorites, newFavorite];
		setFavoritesState(updatedFavorites);
		setFavorites(updatedFavorites);
		await storage.set(STORE_KEY, updatedFavorites);
	};

	const removeFavorite = async (reciterId, chapterNo) => {
		let updated = favorites.filter(
			(item) => item.reciterId !== reciterId || item.chapterNo !== chapterNo
		);
		setFavoritesState(updated);
		setFavorites(updated);
		await storage.set(STORE_KEY, updated);
	};

  return {
    favorites,
    loadFavorites,
    addFavorite,
    removeFavorite
  };
};
