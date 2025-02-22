import { Store } from "pullstate";
import { settings } from "../lib/settings";

export const LocalStore = new Store({
	settings: settings,
	favorites: [],
	liveFavorites: [],
	recent: [],
	liveRecent: [],
	isTab: true,
});

export const setSettings = (settings) => {
	LocalStore.update((s) => {
		s.settings = settings;
	});
};

export const setFavorites = (favorites) => {
	LocalStore.update((s) => {
		s.favorites = favorites;
	});
};
export const setLiveFavorites = (favorites) => {
	LocalStore.update((s) => {
		s.liveFavorites = favorites;
	});
};

export const setRecent = (recent) => {
	LocalStore.update((s) => {
		s.recent = recent;
	});
};

export const setLiveRecent = (recent) => {
	LocalStore.update((s) => {
		s.liveRecent = recent;
	});
};

export const setIsTab = (v) => {
	LocalStore.update((s) => {
		s.isTab = v;
	});
};