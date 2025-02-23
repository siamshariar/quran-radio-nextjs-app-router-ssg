import { useState, useEffect } from 'react';
import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';

const STORE_KEY = "reciterFavorites";

let storage;

const initStorage = async () => {
  storage = new Storage({
    name: '__mydb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });
  await storage.create();
};

export function useReciterFavoriteStorage() {
  const [reciterFavorites, setReciterFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      await initStorage();
      const storedFavorites = await storage.get(STORE_KEY);
      if (storedFavorites && typeof storedFavorites === 'string') {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);
          setReciterFavorites(parsedFavorites);
        } catch (error) {
          console.error("Failed to parse stored favorites:", error);
        }
      }
    };
    fetchFavorites();
  }, []);

  const addReciterFavorite = async (reciter) => {
    await initStorage();
    const updatedFavorites = [...reciterFavorites, reciter];
    setReciterFavorites(updatedFavorites);
    await storage.set(STORE_KEY, JSON.stringify(updatedFavorites));
  };

  const removeReciterFavorite = async (reciterId) => {
    await initStorage();
    const updatedFavorites = reciterFavorites.filter((r) => r.id !== reciterId);
    setReciterFavorites(updatedFavorites);
    await storage.set(STORE_KEY, JSON.stringify(updatedFavorites));
  };

  const isReciterFavorite = (reciterId) => {
    return reciterFavorites.some((r) => r.id === reciterId);
  };

  return {
    reciterFavorites,
    addReciterFavorite,
    removeReciterFavorite,
    isReciterFavorite,
  };
}

