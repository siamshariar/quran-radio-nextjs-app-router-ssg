import { Store } from "pullstate";
import { chapters, reciters, recitations } from "../data";

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  chapters,
  reciters,
  recitations,
  settings: {
    enableNotifications: true,
  },
});

export default Store;
