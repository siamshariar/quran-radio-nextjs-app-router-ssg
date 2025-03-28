import { useEffect } from 'react';
import { PlayerStore } from "../store";
import { LocalStore, setLiveRecent } from "../store/local";
import { checkIsInLiveRecent } from "../lib/check";
import storage from '@/store/storage';

const STORE_KEY = "liveRecent";
const MAX_LENGTH = 100;

export const useLiveRecentStorage = () => {
	const liveRecent = LocalStore.useState((s) => s.liveRecent);
	const currLive = PlayerStore.useState((s) => s.currLive);

  useEffect(() => {
    const fetchLiveRecents = async () => {
      const storedLiveRecents = await storage.getItem(STORE_KEY);
      if (storedLiveRecents && typeof storedLiveRecents === 'string') {
        try {
          const parsedLiveRecents = JSON.parse(storedLiveRecents);
          setLiveRecent(parsedLiveRecents);
        } catch (error) {
          console.error("Failed to parse stored live recents:", error);
        }
      }
    };
    fetchLiveRecents();
  }, []);

	const addLiveRecent = async (liveIndex) => {
		let newRecentArr = [...liveRecent];

		// remove current recent
		if (checkIsInLiveRecent(liveRecent, currLive.id)) {
			newRecentArr = liveRecent.filter((item) => item.id !== currLive.id);
		}

		// if > 100, remove last one
		if (newRecentArr.length >= MAX_LENGTH) {
			newRecentArr = newRecentArr.slice(0, -1);
		}

		const newRecentItem = {
			id: currLive.id,
			liveIndex: liveIndex,
			name: currLive.name,
			liveUrl: currLive.liveUrl,
			logo: currLive.logo,
			createdAt: new Date().getTime(),
		};

		// const updatedRecent = [newRecentItem, ...recent];
		const updatedRecent = [newRecentItem, ...newRecentArr];
		setLiveRecent(updatedRecent);
		await storage.setItem(STORE_KEY, JSON.stringify(updatedRecent));
	  };

    const removeLiveRecent = async (currLive) => {
      let updated = liveRecent.filter((item) => item.id !== currLive.id);
      setLiveRecent(updated);
      await storage.setItem(STORE_KEY, JSON.stringify(updated));
	};

	return {
		addLiveRecent,
		removeLiveRecent,
	};
};
