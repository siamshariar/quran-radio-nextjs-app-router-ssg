import { LocalStore, setSettings } from "../store/local";

const STORE_KEY = "settings";

export const useSettingStorage = () => {
	const settings = LocalStore.useState((s) => s.settings);

	// set to global state and local storage
	const setPlaybackRate = async (rate) => {
		const updatedSettings = { ...settings, playbackRate: rate };
		setSettings(updatedSettings);
		localStorage.setItem(STORE_KEY, JSON.stringify(updatedSettings));
	};

	const setMode = async (mode) => {
		const updatedSettings = { ...settings, mode: mode };
		setSettings(updatedSettings);
		localStorage.setItem(STORE_KEY, JSON.stringify(updatedSettings));
	};

	return {
		setPlaybackRate,
		setMode,
	};
};
