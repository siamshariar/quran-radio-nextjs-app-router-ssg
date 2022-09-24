import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

import { config } from "../lib/config";
import { PlayerStore } from "../store";
import { LocalStore, setFavorites } from "../store/local";

const DB_NAME = config.localDB;
const STORE_KEY = "favorites";

export const useFavoriteStorage = () => {
  const [store, setStore] = useState();

  const favorites = LocalStore.useState((s) => s.favorites);
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

      // const storedFavorites = (await store.get(STORE_KEY)) || [];
      const storedFavorites = (await store.get(STORE_KEY)) || favorites;
      setFavorites(storedFavorites);
    };

    initStorage();
  }, []);

  const addFavorite = async (reciterId, chapterIndex) => {
    const filtered = reciters.filter(
      (reciter) => reciter.reciter_id === reciterId
    );
    const reciter = filtered[0];

    const newFavorite = {
      id: "" + new Date().getTime(),
      reciterId: reciterId,
      reciterSlug: reciter.reciter_slug,
      reciterName: reciter.reciter_name,
      reciterImage: reciter.reciter_image,
      chapterIndex: chapterIndex,
      chapterName: chapters[chapterIndex].name,
      createdAt: new Date().getTime(),
      status: 1,
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    store?.set(STORE_KEY, updatedFavorites);
  };

  const removeFavorite = async (reciterId, chapterIndex) => {
    let updated = favorites.filter(
      (item) =>
        item.reciterId !== reciterId || item.chapterIndex !== chapterIndex
    );
    setFavorites(updated);
    return store?.set(STORE_KEY, updated);
  };

  return {
    addFavorite,
    removeFavorite,
  };
};
