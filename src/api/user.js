import auth from './firebase.auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    //const credential = GoogleAuthProvider.credentialFromResult(result);
    //const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    return {
      username: user.displayName,
      email: user.email,
      uid: user.uid,
    };
  } catch (err) {
    return err;
  }
};
