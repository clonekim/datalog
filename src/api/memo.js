import db from './firebase.firestore';

import { addDoc, collection, getDocs } from 'firebase/firestore';

export const fetch = async () => {
  try {
    const resp = await getDocs(collection(db, 'memos'));
    const payload = [];
    resp.forEach(doc => payload.push({ id: doc.id, ...doc.data() }));
    return payload;
  } catch (err) {
    console.log('Error =>', err);
    return [];
  }
};

export const create = async payload => {
  return await addDoc(collection(db, 'memos'), payload);
};
