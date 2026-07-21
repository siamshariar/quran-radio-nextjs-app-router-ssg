"use client"

import { useState, useEffect } from "react"
import storage from "@/store/storage"
import { AudioStore, updateTrackInfo } from "@/store/audio"

export const useTrackStorage = () => {
  const [trackPausedTimes, setTrackPausedTimes] = useState({})
  const [trackDurations, setTrackDurations] = useState({})
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const pausedTimes = await storage
          .getItem("trackPausedTimes")
          .then((data) => {
            if (!data) return {}
            return typeof data === "string" ? JSON.parse(data) : data
          })
          .catch((err) => {
            console.error("Error loading paused times:", err)
            return {}
          })

        const durations = await storage
          .getItem("trackDurations")
          .then((data) => {
            if (!data) return {}
            return typeof data === "string" ? JSON.parse(data) : data
          })
          .catch((err) => {
            console.error("Error loading durations:", err)
            return {}
          })

        if (Object.keys(pausedTimes).length === 0) {
          const localPausedTimes = localStorage.getItem("trackPausedTimes")
          if (localPausedTimes) {
            try {
              const parsed = JSON.parse(localPausedTimes)
              setTrackPausedTimes(parsed)
              await storage.setItem("trackPausedTimes", localPausedTimes)
            } catch (e) {
              console.error("Error parsing localStorage paused times:", e)
            }
          }
        } else {
          setTrackPausedTimes(pausedTimes)
        }

        if (Object.keys(durations).length === 0) {
          const localDurations = localStorage.getItem("trackDurations")
          if (localDurations) {
            try {
              const parsed = JSON.parse(localDurations)
              setTrackDurations(parsed)
              await storage.setItem("trackDurations", localDurations)
            } catch (e) {
              console.error("Error parsing localStorage durations:", e)
            }
          }
        } else {
          setTrackDurations(durations)
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Error loading track storage data:", error)
        syncFromLocalStorage()
      }
    }

    loadStoredData()
  }, [])

  const saveTrackPausedTime = async (reciterId, chapterNo, time) => {
    try {
      if (!time || isNaN(time)) return false

      const trackKey = `${reciterId}-${chapterNo}`
      const updatedPausedTimes = { ...trackPausedTimes, [trackKey]: time }

      setTrackPausedTimes(updatedPausedTimes)

      await storage.setItem("trackPausedTimes", JSON.stringify(updatedPausedTimes))

      localStorage.setItem("trackPausedTimes", JSON.stringify(updatedPausedTimes))

      return true
    } catch (error) {
      console.error("Error saving track paused time:", error)
      return false
    }
  }

  const getTrackPausedTime = async (reciterId, chapterNo) => {
    try {
      const trackKey = `${reciterId}-${chapterNo}`

      if (trackPausedTimes[trackKey]) {
        return trackPausedTimes[trackKey]
      }

      if (isInitialized) {
        const pausedTimes = await storage
          .getItem("trackPausedTimes")
          .then((data) => {
            if (!data) return {}
            return typeof data === "string" ? JSON.parse(data) : data
          })
          .catch(() => ({}))

        if (Object.keys(pausedTimes).length > 0) {
          setTrackPausedTimes(pausedTimes)
        }

        return pausedTimes[trackKey] || 0
      }

      return 0
    } catch (error) {
      console.error("Error getting track paused time:", error)
      return 0
    }
  }

  const saveTrackDuration = async (reciterId, chapterNo, duration) => {
    try {
      if (!duration || isNaN(duration)) return;

      const trackKey = `${reciterId}-${chapterNo}`;

      updateTrackInfo(reciterId, chapterNo, { duration });

      await storage.setItem(`trackDuration-${reciterId}-${chapterNo}`, duration.toString());

      localStorage.setItem(`trackDuration-${reciterId}-${chapterNo}`, duration.toString());
    } catch (error) {
      console.error("Error saving track duration:", error);
    }
  };


    const getTrackDuration = async (reciterId, chapterNo) => {
      try {
        const storeState = AudioStore.getRawState();
        const trackKey = `${reciterId}-${chapterNo}`;
        if (storeState.trackInfoMap[trackKey]?.duration) {
          return storeState.trackInfoMap[trackKey].duration;
        }

        const duration = await storage.getItem(`trackDuration-${reciterId}-${chapterNo}`);
        if (duration) return parseFloat(duration);

        const localDuration = localStorage.getItem(`trackDuration-${reciterId}-${chapterNo}`);
        if (localDuration) return parseFloat(localDuration);

        return 0;
      } catch (error) {
        console.error("Error getting track duration:", error);
        return 0;
      }
    };

  const clearTrackPausedTime = async (reciterId, chapterNo) => {
    try {
      const trackKey = `${reciterId}-${chapterNo}`
      const updatedPausedTimes = { ...trackPausedTimes }
      delete updatedPausedTimes[trackKey]

      setTrackPausedTimes(updatedPausedTimes)

      await storage.setItem("trackPausedTimes", JSON.stringify(updatedPausedTimes))

      localStorage.setItem("trackPausedTimes", JSON.stringify(updatedPausedTimes))

      return true
    } catch (error) {
      console.error("Error clearing track paused time:", error)
      return false
    }
  }

  const syncFromLocalStorage = () => {
    try {
      const localPausedTimes = localStorage.getItem("trackPausedTimes")
      const localDurations = localStorage.getItem("trackDurations")

      if (localPausedTimes) {
        try {
          const parsedPausedTimes = JSON.parse(localPausedTimes)
          setTrackPausedTimes(parsedPausedTimes)
          storage.setItem("trackPausedTimes", localPausedTimes)
        } catch (e) {
          console.error("Error parsing localStorage paused times:", e)
        }
      }

      if (localDurations) {
        try {
          const parsedDurations = JSON.parse(localDurations)
          setTrackDurations(parsedDurations)
          storage.setItem("trackDurations", localDurations)
        } catch (e) {
          console.error("Error parsing localStorage durations:", e)
        }
      }

      setIsInitialized(true)
    } catch (error) {
      console.error("Error syncing from localStorage:", error)
    }
  }

  return {
    saveTrackPausedTime,
    getTrackPausedTime,
    saveTrackDuration,
    getTrackDuration,
    clearTrackPausedTime,
    syncFromLocalStorage,
    trackPausedTimes,
    trackDurations,
    isInitialized,
  }
}
