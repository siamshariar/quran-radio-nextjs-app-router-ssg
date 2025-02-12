import { useState, useEffect } from "react"

export function useReciterFavoriteStorage() {
  const [reciterFavorites, setReciterFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("reciterFavorites")
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites)
      setReciterFavorites(parsedFavorites)
    }
  }, [])

  const addReciterFavorite = (reciter) => {
    const updatedFavorites = [...reciterFavorites, reciter]
    setReciterFavorites(updatedFavorites)
    localStorage.setItem("reciterFavorites", JSON.stringify(updatedFavorites))
  }

  const removeReciterFavorite = (reciterId) => {
    const updatedFavorites = reciterFavorites.filter((r) => r.id !== reciterId)
    setReciterFavorites(updatedFavorites)
    localStorage.setItem("reciterFavorites", JSON.stringify(updatedFavorites))
  }

  const isReciterFavorite = (reciterId) => {
    return reciterFavorites.some((r) => r.id === reciterId)
  }

  return {
    reciterFavorites,
    addReciterFavorite,
    removeReciterFavorite,
    isReciterFavorite,
  }
}

