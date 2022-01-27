import db from './firebase.firestore';
import auth from './firebase.auth';

import functions from './firebase.function';
import { httpsCallable } from 'firebase/functions';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

const addPost = httpsCallable(functions, 'handler/addPost');
const fetchPosts = httpsCallable(functions, 'handler/fetchPosts');

export const fetch = async () => {
  try {
    const { data = [] } = await fetchPosts();

    return data;
  } catch (err) {
    console.log('Error =>', err);
    return [];
  }
};

export const create = async payload => {


  const writeResult = await addDoc(collection(db, 'posts'), Object.assign(payload, {
    author: {
      ref: `profiles/${auth.currentUser.uid}`
    },
    isDraft: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }));

  payload.tags.map(async tag => {
    const ref = doc(db, `tags/${tag}`);
    const snapshot = await getDoc(ref);
    const count = snapshot.exists() ? snapshot.data().count + 1 : 1;
    setDoc(ref, { count });
  })

  return writeResult;
};
