import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  setDoc,
  updateDoc,
  deleteDoc,
  increment,
  onSnapshot,
  query,
  limit,
} from 'firebase/firestore';
import auth from './firebase.auth';
import db from './firebase.firestore';
import md from './markdown';
import difference from 'lodash/difference';

export const fetch = async () => {
  const q = query(collection(db, 'posts'), limit(20));
  const snapshots = await getDocs(q);
  const payload = [];

  snapshots.forEach(snap => {
    payload.push(
      new Promise(async (resolve, reject) => {
        const _doc = snap.data();
        const authorRef = doc(db, snap.get('author.ref'));
        const author = await getDoc(authorRef);
        const data = {
          ..._doc,
          id: snap.id,
          author: author.get('displayName'),
          body: md.render(_doc.body),
          createdAt: _doc.createdAt.toDate(),
          updatedAt: _doc.createdAt.toDate(),
        };

        resolve(data);
      }),
    );
  });

  return await Promise.all(payload);
};

export const create = async payload => {
  const data = Object.assign(payload, {
    author: {
      ref: `users/${auth.currentUser.uid}`,
    },
    isDraft: true,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });

  const writeResult = await addDoc(collection(db, 'posts'), data);

  payload.tags.map(async tag => {
    const ref = doc(db, `tags/${tag}`);
    setDoc(ref, { count: increment(1) });
  });

  return {
    ...data,
    id: writeResult.id,
    body: md.render(data.body),
    author: auth.currentUser.displayName,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
};

export const fetchById = async id => {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  } else {
    throw new Error('not found');
  }
};

export const update = async payload => {
  const docRef = doc(db, 'posts', payload.id);
  const docSnap = await getDoc(doc(db, 'posts', payload.id));

  if (!docSnap.exists()) throw new Error('not found');

  const origin = docSnap.data();
  const added = difference(payload.tags, origin.tags);
  const removed = difference(origin.tags, payload.tags);

  added.map(async tag => {
    const ref = doc(db, `tags/${tag}`);
    setDoc(ref, { count: increment(1) });
  });

  removed.map(async tag => {
    const ref = doc(db, `tags/${tag}`);
    const snap = await getDoc(ref);
    setDoc(ref, { count: snap.get('count') - 1 });
  });

  const data = {
    body: payload.body,
    tags: payload.tags,
    updatedAt: Timestamp.fromDate(new Date()),
  };

  await updateDoc(docRef, data);

  return {
    ...origin,
    id: payload.id,
    author: auth.currentUser.displayName,
    body: md.render(payload.body),
    tags: payload.tags,
    updatedAt: data.updatedAt.toDate(),
  };
};

export const remove = async id => {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('not found');

  const origin = docSnap.data();

  origin.tags.map(async tag => {
    const ref = doc(db, `tags/${tag}`);
    const snap = await getDoc(ref);
    const count = snap.get('count') || 0;
    setDoc(ref, { count: count > 0 ? count - 1 : 0 });
  });

  await deleteDoc(docRef);
  return true;
};

const unsub = onSnapshot(doc(db, 'posts', '*'), doc => {
  console.log('Watch Posts =>>>', doc);
});
