import { PlayerStore } from "../store";
import { LocalStore, setFavorites } from "../store/local";

const STORE_KEY = "favorites";

export const useFavoriteStorage = () => {
	const favorites = LocalStore.useState((s) => s.favorites);
	const chapters = PlayerStore.useState((s) => s.chapters);
	const reciters = PlayerStore.useState((s) => s.reciters);
	const chapterList = PlayerStore.useState((s) => s.chapterList);

	const addFavorite = async (reciterId, chapterNo, chapterIndex) => {
		const reciter = reciters.find((obj) => obj.id == reciterId);
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
			createdAt: new Date().getTime(),
			// status: 1,
		};

		const updatedFavorites = [...favorites, newFavorite];
		setFavorites(updatedFavorites);
		localStorage.setItem(STORE_KEY, JSON.stringify(updatedFavorites));
	};

	const removeFavorite = async (reciterId, chapterNo) => {
		let updated = favorites.filter(
			(item) => item.reciterId !== reciterId || item.chapterNo !== chapterNo
		);
		setFavorites(updated);
		localStorage.setItem(STORE_KEY, JSON.stringify(updated));
	};

	return {
		addFavorite,
		removeFavorite,
	};
};
