import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';

const storage = new Storage({
  name: '__mydb',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage, Drivers.WebSQL]
});

storage.create().catch((error) => {
  console.error("Error creating storage:", error);
});

export default storage;