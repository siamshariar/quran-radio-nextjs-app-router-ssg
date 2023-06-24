import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

import { config } from "../lib/config";
import { PlayerStore } from "../store";
import { LocalStore, setRecent } from "../store/local";
import { checkIsInRecent } from "../lib/check";

const DB_NAME = config.localDB;
const STORE_KEY = "recent";
const MAX_LENGTH = 100;

export const useRecentStorage = () => {
  const [store, setStore] = useState();

  const recent = LocalStore.useState((s) => s.recent);
  const chapters = PlayerStore.useState((s) => s.chapters);
  const reciters = PlayerStore.useState((s) => s.reciters);

  useEffect(() => {
    const initStorage = async () => {
      const newStore = new Storage({
        name: DB_NAME,
        driverOrder: [
          CordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
        ],
      });

      await newStore.defineDriver(CordovaSQLiteDriver);

      const store = await newStore.create();
      setStore(store);

      // const storedRecent = (await store.get(STORE_KEY)) || [];
      const storedRecent = (await store.get(STORE_KEY)) || recent;
      setRecent(storedRecent);
    };

    initStorage();
  }, []);

  const addRecent = async (reciterId, chapterIndex) => {
    let newRecentArr = [...recent];

    if (checkIsInRecent(recent, reciterId, chapterIndex)) {
      newRecentArr = recent.filter(
        (item) =>
          item.reciterId !== reciterId || item.chapterIndex !== chapterIndex
      );
    }

    if (newRecentArr.length >= MAX_LENGTH) {
      newRecentArr = newRecentArr.slice(0, -1);
    }

    const filtered = reciters.filter((reciter) => reciter.id === reciterId);

    const reciter = filtered[0];

    const newRecentItem = {
      id: "" + new Date().getTime(),
      reciterId: reciterId,
      reciterSlug: "reciter.reciter_slug",
      reciterName: reciter.name,
      reciterImage: "reciter.reciter_image",
      chapterIndex: chapterIndex,
      chapterName: chapters[chapterIndex].name,
      createdAt: new Date().getTime(),
    };

    // const updatedRecent = [newRecentItem, ...recent];
    const updatedRecent = [newRecentItem, ...newRecentArr];
    setRecent(updatedRecent);
    store?.set(STORE_KEY, updatedRecent);
  };

  const removeRecent = async (reciterId, chapterIndex) => {
    let updated = recent.filter(
      (item) =>
        item.reciterId !== reciterId || item.chapterIndex !== chapterIndex
    );
    setRecent(updated);
    return store?.set(STORE_KEY, updated);
  };

  return {
    addRecent,
    removeRecent,
  };
};
