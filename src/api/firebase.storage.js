import { getStorage, connectStorageEmulator } from 'firebase/storage';
import app from './firebase.config';

const storage = getStorage(app);

if (process.env.NODE_ENV === 'development') {
  connectStorageEmulator(storage, 'localhost', 9199);
}

export default storage;
