import auth from './firebase.auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

export const signOut = () => {
  return auth.signOut();
}

export const watchUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      console.log('user state => ', user);
      if (user) {
        resolve({
          username: user.displayName,
          uid: user.uid,
          initials: (user.displayName || '?').charAt(0).toUpperCase(),
        });
      } else {
        reject();
      }
    });
  });
};
