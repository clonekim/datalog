import { connectAuthEmulator, getAuth } from 'firebase/auth';
import app from './firebase.config';

const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export default auth;
