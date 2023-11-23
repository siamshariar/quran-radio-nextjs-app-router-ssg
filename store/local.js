import { Store } from "pullstate";
import { settings } from "../lib/settings";

export const LocalStore = new Store({
	settings: settings,
	favorites: [],
	recent: [],
	// to handle scroll
	isBack: false,
	yp: {},
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

export const setRecent = (recent) => {
	LocalStore.update((s) => {
		s.recent = recent;
	});
};

export const setIsBack = (v) => {
	LocalStore.update((s) => {
		s.isBack = v;
	});
};

export const setScrollPosition = (key, v) => {
	LocalStore.update((s) => {
		s.yp[key] = v;
	});
};
