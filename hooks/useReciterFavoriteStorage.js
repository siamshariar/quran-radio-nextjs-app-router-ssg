import { useState, useEffect } from 'react';
import storage from '@/store/storage';

const STORE_KEY = 'reciterFavorites';

export function useReciterFavoriteStorage() {
  const [reciterFavorites, setReciterFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await storage.get(STORE_KEY);
      if (storedFavorites) {
        setReciterFavorites(storedFavorites);
      }
    };
    fetchFavorites();
  }, []);

  const addReciterFavorite = async (reciter) => {
    const updatedFavorites = [...reciterFavorites, reciter];
    setReciterFavorites(updatedFavorites);
    await storage.set(STORE_KEY, updatedFavorites);
  };

  const removeReciterFavorite = async (reciterId) => {
    const updatedFavorites = reciterFavorites.filter((r) => r.id !== reciterId);
    setReciterFavorites(updatedFavorites);
    await storage.set(STORE_KEY, updatedFavorites);
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

