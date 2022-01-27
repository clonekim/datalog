import db from './firebase.firestore';

import { addDoc, collection, getDocs } from 'firebase/firestore';

export const fetch = async () => {
  const resp = await getDocs(collection(db, 'tags'));
  const payload = [];
  resp.forEach(doc =>
    payload.push({ name: doc.id, id: doc.id, ...doc.data() }),
  );
  return payload;
};

export const create = async payload => {
  return await addDoc(collection(db, 'tags'), payload);
};
