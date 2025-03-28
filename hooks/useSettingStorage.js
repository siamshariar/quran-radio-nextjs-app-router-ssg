import { useEffect } from "react";
import { LocalStore, setSettings } from "../store/local";
import storage from "@/store/storage";

const STORE_KEY = "settings";

export const useSettingStorage = () => {
	const settings = LocalStore.useState((s) => s.settings);

  useEffect(() => {
    const fetchSettings = async () => {
      const storedSettings = await storage.getItem(STORE_KEY);
      if (storedSettings && typeof storedSettings === 'string') {
        try {
          const parsedSettings = JSON.parse(storedSettings);
          setSettings(parsedSettings);
        } catch (error) {
          console.error("Failed to parse stored settings:", error);
        }
      }
    };
    fetchSettings();
  }, []);

	// set to global state and local storage
	const setPlaybackRate = async (rate) => {
		const updatedSettings = { ...settings, playbackRate: rate };
		setSettings(updatedSettings);
		await storage.setItem(STORE_KEY, JSON.stringify(updatedSettings));
	};

	const setMode = async (mode) => {
		const updatedSettings = { ...settings, mode: mode };
		setSettings(updatedSettings);
		await storage.setItem(STORE_KEY, JSON.stringify(updatedSettings));
	};

	return {
		setPlaybackRate,
		setMode,
	};
};
