import { useEffect } from "react"
import { PlayerStore } from "../store";
import { LocalStore, setRecent } from "../store/local";
import { checkIsInRecent } from "../lib/check";
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
      const storedRecents = await storage.getItem(STORE_KEY)
      if (storedRecents) {
        try {
          const parsedRecents = typeof storedRecents === "string" ? JSON.parse(storedRecents) : storedRecents

          if (Array.isArray(parsedRecents)) {
            setRecent(parsedRecents)
          }
        } catch (error) {
          console.error("Failed to parse stored recents:", error)

          const localRecents = localStorage.getItem(STORE_KEY)
          if (localRecents) {
            try {
              const parsedLocalRecents = JSON.parse(localRecents)
              setRecent(parsedLocalRecents)
              storage.setItem(STORE_KEY, localRecents)
            } catch (e) {
              console.error("Failed to parse localStorage recents:", e)
            }
          }
        }
      }
    }
    fetchRecents()
  }, [])

	const addRecent = async (reciterId, chapterIndex, pausedAt, duration) => {
		const chapterNo = chapterList[chapterIndex];
		let newRecentArr = [...recent];

		// remove current recent
		if (checkIsInRecent(recent, reciterId, chapterNo)) {
			newRecentArr = recent.filter(
				(item) =>
					item.reciterId !== reciterId || item.chapterNo !== chapterNo
			);
		}

		// if > 100, remove last one
		if (newRecentArr.length >= MAX_LENGTH) {
			newRecentArr = newRecentArr.slice(0, -1);
		}

		const reciter = reciters.find((obj) => obj.id === reciterId);

    const currentPausedAt = pausedAt !== undefined ? pausedAt : (await storage.getItem("visualizerProgress")) || 0

    const currentDuration =
      duration !== undefined ? duration : (await storage.getItem(`trackDuration-${reciterId}-${chapterNo}`)) || 0

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
			pausedAt: currentPausedAt,
      duration: currentDuration,
		};

		// const updatedRecent = [newRecentItem, ...recent];
		const updatedRecent = [newRecentItem, ...newRecentArr];
		setRecent(updatedRecent);

    try {
      await storage.setItem(STORE_KEY, JSON.stringify(updatedRecent))

      localStorage.setItem(STORE_KEY, JSON.stringify(updatedRecent))
    } catch (error) {
      console.error("Failed to save recents to storage:", error)
      localStorage.setItem(STORE_KEY, JSON.stringify(updatedRecent))
    }
  }

  const getRecent = (reciterId, chapterNo) => {
    return recent.find((item) => item.reciterId === reciterId && item.chapterNo === chapterNo)
  }

  const removeRecent = async (reciterId, chapterNo) => {
    const updated = recent.filter((item) => item.reciterId !== reciterId || item.chapterNo !== chapterNo)
    setRecent(updated)

    try {
      await storage.setItem(STORE_KEY, JSON.stringify(updated))
      localStorage.setItem(STORE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to save updated recents to storage:", error)
      localStorage.setItem(STORE_KEY, JSON.stringify(updated))
    }
  }

	return {
		addRecent,
		getRecent,
		removeRecent,
	};
};
