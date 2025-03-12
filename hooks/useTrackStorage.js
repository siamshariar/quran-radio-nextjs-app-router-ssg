"use client"

import { useState, useEffect } from "react"
import storage from "@/store/storage"

export const useTrackStorage = () => {
  const [trackPausedTimes, setTrackPausedTimes] = useState({})
  const [trackDurations, setTrackDurations] = useState({})

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const pausedTimes = JSON.parse((await storage.getItem("trackPausedTimes")) || "{}")
        const durations = JSON.parse((await storage.getItem("trackDurations")) || "{}")
        setTrackPausedTimes(pausedTimes)
        setTrackDurations(durations)
      } catch (error) {
        console.error("Error loading track storage data:", error)
      }
    }

    loadStoredData()
  }, [])

  const saveTrackPausedTime = async (reciterId, chapterNo, time) => {
    try {
      const trackKey = `${reciterId}-${chapterNo}`
      const updatedPausedTimes = { ...trackPausedTimes, [trackKey]: time }
      setTrackPausedTimes(updatedPausedTimes)
      await storage.setItem("trackPausedTimes", JSON.stringify(updatedPausedTimes))
    } catch (error) {
      console.error("Error saving track paused time:", error)
    }
  }

  const getTrackPausedTime = (reciterId, chapterNo) => {
    const trackKey = `${reciterId}-${chapterNo}`
    return trackPausedTimes[trackKey] || 0
  }

  const saveTrackDuration = async (reciterId, chapterNo, duration) => {
    try {
      const trackKey = `${reciterId}-${chapterNo}`
      const updatedDurations = { ...trackDurations, [trackKey]: duration }
      setTrackDurations(updatedDurations)
      await storage.setItem("trackDurations", JSON.stringify(updatedDurations))
    } catch (error) {
      console.error("Error saving track duration:", error)
    }
  }

  const getTrackDuration = (reciterId, chapterNo) => {
    const trackKey = `${reciterId}-${chapterNo}`
    return trackDurations[trackKey] || 0
  }

  const clearTrackPausedTime = async (reciterId, chapterNo) => {
    try {
      const trackKey = `${reciterId}-${chapterNo}`
      const updatedPausedTimes = { ...trackPausedTimes }
      delete updatedPausedTimes[trackKey]
      setTrackPausedTimes(updatedPausedTimes)
      await storage.setItem("trackPausedTimes", JSON.stringify(updatedPausedTimes))
    } catch (error) {
      console.error("Error clearing track paused time:", error)
    }
  }

  return {
    saveTrackPausedTime,
    getTrackPausedTime,
    saveTrackDuration,
    getTrackDuration,
    clearTrackPausedTime,
    trackPausedTimes,
    trackDurations,
  }
}

