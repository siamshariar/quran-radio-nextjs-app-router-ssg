import { Storage } from '@ionic/storage';
import localforage from 'localforage';

const storage = new Storage({
  name: '__mydb',
  driverOrder: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]
});

storage.create();

export default storage;