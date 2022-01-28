import db from './firebase.firestore';

import {
  addDoc,
  collection,
  getDocs,
  doc,
  query,
  onSnapshot,
} from 'firebase/firestore';

export const fetch = async () => {
  const q = query(collection(db, 'tags').where('count', '>', 0));
  const resp = await getDocs(q);
  const payload = [];
  resp.forEach(doc =>
    payload.push({ name: doc.id, id: doc.id, ...doc.data() }),
  );
  return payload;
};

export const create = async payload => {
  return await addDoc(collection(db, 'tags'), payload);
};

const unsub = onSnapshot(doc(db, 'tags', '*'), doc => {
  console.log('Realtime =>>>', typeof doc);
});
