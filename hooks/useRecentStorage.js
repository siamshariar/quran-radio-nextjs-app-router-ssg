import { PlayerStore } from "../store";
import { LocalStore, setRecent } from "../store/local";
import { checkIsInRecent } from "../lib/check";

const STORE_KEY = "recent";
const MAX_LENGTH = 100;

export const useRecentStorage = () => {
	const recent = LocalStore.useState((s) => s.recent);
	const chapters = PlayerStore.useState((s) => s.chapters);
	const reciters = PlayerStore.useState((s) => s.reciters);
	const chapterList = PlayerStore.useState((s) => s.chapterList);

	const addRecent = async (reciterId, chapterIndex) => {
		const chapterNo = chapterList[chapterIndex];
		let newRecentArr = [...recent];

		// remove current recent
		if (checkIsInRecent(recent, reciterId, chapterNo)) {
			newRecentArr = recent.filter(
				(item) =>
					item.reciterId !== reciterId || item.chapterIndex !== chapterIndex
			);
		}

		// if > 100, remove last one
		if (newRecentArr.length >= MAX_LENGTH) {
			newRecentArr = newRecentArr.slice(0, -1);
		}

		const reciter = reciters.find((obj) => obj.id === reciterId);

		const newRecentItem = {
			// id: "" + new Date().getTime(),
			reciterId: reciterId,
			reciterSlug: "",
			reciterName: reciter.name,
			reciterImage: "",
			chapterIndex: chapterIndex,
			chapterList: chapterList,
			chapterNo: chapterNo,
			chapterName: chapters[chapterNo - 1].name,
			createdAt: new Date().getTime(),
			status: 1,
		};

		// const updatedRecent = [newRecentItem, ...recent];
		const updatedRecent = [newRecentItem, ...newRecentArr];
		setRecent(updatedRecent);
		localStorage.setItem(STORE_KEY, JSON.stringify(updatedRecent));
	};

	return {
		addRecent,
	};
};
