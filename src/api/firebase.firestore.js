import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import app from './firebase.config';

const store = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(store, 'localhost', 8080);
}

export default store;
