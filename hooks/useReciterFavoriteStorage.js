import { useState, useEffect } from 'react';
import storage from '@/store/storage';

const STORE_KEY = "reciterFavorites";

export function useReciterFavoriteStorage() {
  const [reciterFavorites, setReciterFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await storage.getItem(STORE_KEY);
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
    const updatedFavorites = [...reciterFavorites, reciter];
    setReciterFavorites(updatedFavorites);
    await storage.setItem(STORE_KEY, JSON.stringify(updatedFavorites));
  };

  const removeReciterFavorite = async (reciterId) => {
    const updatedFavorites = reciterFavorites.filter((r) => r.id !== reciterId);
    setReciterFavorites(updatedFavorites);
    await storage.setItem(STORE_KEY, JSON.stringify(updatedFavorites));
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

