import { Store } from "pullstate";
import { settings } from "../lib/settings";

export const LocalStore = new Store({
  settings: settings,
  favorites: [],
  recent: [],
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
