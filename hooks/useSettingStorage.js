import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

import { config } from "../lib/config";
import { LocalStore, setSettings } from "../store/local";

const DB_NAME = config.localDB;
const STORE_KEY = "settings";

export const useSettingStorage = () => {
	const [store, setStore] = useState();

	const settings = LocalStore.useState((s) => s.settings);

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

			// retrieve settings and set to global state
			const storedSettings = (await store.get(STORE_KEY)) || settings;
			setSettings(storedSettings);
		};

		initStorage();
	}, []);

	const setPlaybackRate = async (rate) => {
		const updatedSettings = { ...settings, playbackRate: rate };
		setSettings(updatedSettings);
		store?.set(STORE_KEY, updatedSettings);
	};

	// set to global state and indexed db
	const setMode = async (mode) => {
		const updatedSettings = { ...settings, mode: mode };
		setSettings(updatedSettings);
		store?.set(STORE_KEY, updatedSettings);
	};

	return {
		setPlaybackRate,
		setMode,
	};
};
