import { useState, useEffect } from 'react';
import storage from '@/store/storage';

const STORAGE_KEY = 'reciterFavorites';

export function useReciterFavoriteStorage() {
  const [reciterFavorites, setReciterFavorites] = useState([]);

  const loadReciterFavorites = async () => {
    const storedFavorites = await storage.get(STORAGE_KEY);
    if (storedFavorites) {
      setReciterFavorites(storedFavorites);
    }
  };

  useEffect(() => {
    loadReciterFavorites();
  }, []);

  const addReciterFavorite = async (reciter) => {
    const updatedFavorites = [...reciterFavorites, reciter];
    setReciterFavorites(updatedFavorites);
    await storage.set(STORAGE_KEY, updatedFavorites);
  };

  const removeReciterFavorite = async (reciterId) => {
    const updatedFavorites = reciterFavorites.filter((r) => r.id !== reciterId);
    setReciterFavorites(updatedFavorites);
    await storage.set(STORAGE_KEY, updatedFavorites);
  };

  const isReciterFavorite = (reciterId) => {
    return reciterFavorites.some((r) => r.id === reciterId);
  };

  return {
    reciterFavorites,
    loadReciterFavorites,
    addReciterFavorite,
    removeReciterFavorite,
    isReciterFavorite
  };
}

