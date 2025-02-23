import { useEffect } from "react";
import { PlayerStore } from "../store";
import { LocalStore, setRecent } from "../store/local";
import { checkIsInRecent } from "../lib/check";
import { format } from "date-fns";
import storage from "@/store/storage";

const STORE_KEY = "recent";
const MAX_LENGTH = 100;

export const useRecentStorage = () => {
	const recent = LocalStore.useState((s) => s.recent);
	const chapters = PlayerStore.useState((s) => s.chapters);
	const reciters = PlayerStore.useState((s) => s.reciters);
	const chapterList = PlayerStore.useState((s) => s.chapterList);

  useEffect(() => {
    const fetchRecents = async () => {
      const storedRecents = await storage.getItem(STORE_KEY);
      if (storedRecents && typeof storedRecents === 'string') {
        try {
          const parsedRecents = JSON.parse(storedRecents);
          setRecent(parsedRecents);
        } catch (error) {
          console.error("Failed to parse stored recents:", error);
        }
      }
    };
    fetchRecents();
  }, []);

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
	
		const formattedDate = format(new Date(), "MMMM d, yyyy h:mm a"); // Format date and time
	
		const newRecentItem = {
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
			status: 1,
		};
	
		// const updatedRecent = [newRecentItem, ...recent];
		const updatedRecent = [newRecentItem, ...newRecentArr];
		setRecent(updatedRecent);
		await storage.setItem(STORE_KEY, JSON.stringify(updatedRecent));
	};

	const removeRecent = async (reciterId, chapterNo) => {
		let updated = recent.filter(
			(item) => item.reciterId !== reciterId || item.chapterNo !== chapterNo
		);
		setRecent(updated);
		await storage.setItem(STORE_KEY, JSON.stringify(updated));
	};

	return {
		addRecent,
		removeRecent,
	};
};
