const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

const express = require('express');
const cors = require('cors');
const markdown = require('markdown-it');
const app = express();

const md = markdown({
  html: true,
});

admin.initializeApp();

const logger = functions.logger;
const firestore = admin.firestore();
const auth = admin.auth();

exports.saveAuthentication = functions.auth.user().onCreate(async user => {
  logger.debug('User logged in ->', user);

  await auth.setCustomUserClaims(user.uid, {
    disabled: true,
    admin: true,
  });

  return await firestore
    .collection('profiles')
    .doc(user.uid)
    .create({
      displayName: user.displayName || 'Unknown',
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/addPost', async (req, res) => {
  const { sub, body, tags, authId } = req.body.data;
  const data = {
    sub,
    body,
    tags,
    author: {
      ref: `profiles/${authId}`,
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    isDraft: true,
  };

  tags.forEach(async tag => {
    const tagSnapShot = firestore.doc(`tags/${tag}`);
    tagSnapShot.set({ count: admin.firestore.FieldValue.increment(1) });
  });

  const writeResult = await firestore.collection('posts').add(data);

  res.json({
    ...data,
    id: writeResult.id,
    body: md.render(body),
  });
});

app.post('/fetchPosts', async (req, res) => {
  logger.debug('fetch posts');
  const posts = await firestore.collection('posts').get();

  const data = await Promise.all(
    posts.docs.map(async doc => {
      const profile = await firestore.doc(doc.get('author.ref')).get();
      const _doc = doc.data();
      return Object.assign(_doc, {
        id: doc.id,
        author: profile.get('displayName'),
        body: md.render(_doc.body),
        createdAt: _doc.createdAt.toDate(),
        updatedAt: _doc.updatedAt.toDate(),
      });
    }),
  );

  res.json({ data });
});

exports.handler = functions.https.onRequest(app);
