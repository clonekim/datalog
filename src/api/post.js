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
  query,
  limit,
} from 'firebase/firestore';
import auth from './firebase.auth';
import db from './firebase.firestore';
import storage from './firebase.storage';
import md from './markdown';
import difference from 'lodash/difference';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { keyBy } from 'lodash';

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
  const data = Object.assign({}, payload, {
    author: {
      ref: `users/${auth.currentUser.uid}`,
    },
    isDraft: true,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
    attachments: payload.attachments.map(f => ({
      name: f.name,
      size: f.size,
      path: uuid(),
    })),
  });

  const writeResult = await addDoc(collection(db, 'posts'), data);

  const fileKeyBy = keyBy(data.attachments, i => i.name);

  payload.attachments.map(async file => {
    const path = fileKeyBy[file.name].path;
    const storageRef = ref(storage, `${writeResult.id}/${path}`);
    const metadata = {
      customMetadata: {
        localFileName: file.name,
      },
    };

    await uploadBytes(storageRef, file, metadata);
  });

  payload.tags.map(async tag => {
    const ref = doc(db, `tags/${tag}`);
    const snap = await getDoc(ref);
    const count = snap.exists() ? snap.get('count') + 1 : 1;
    setDoc(ref, { count });
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
    const _doc = docSnap.data();

    return {
      ..._doc,
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
    const snap = await getDoc(ref);
    const count = snap.exists() ? snap.get('count') + 1 : 1;
    setDoc(ref, { count });
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

  const listRef = ref(storage, `${id}`);

  const { items } = await listAll(listRef);

  if (items) {
    await Promise.all(
      items.map(async i => await deleteObject(ref(storage, i.fullPath))),
    );
  }

  return true;
};

export const generateURL = async path => {
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
};
