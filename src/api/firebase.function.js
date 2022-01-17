import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import app from './firebase.config';

const functions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export default functions;
