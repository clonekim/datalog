import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import app from './firebase.config';

const db = getDatabase(app);

if (process.env.NODE_ENV === 'development') {
  connectDatabaseEmulator(db, 'localhost', 9090);
}

export default db;
