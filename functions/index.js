const functions = require('firebase-functions');
const logger = functions.logger;
const admin = require('firebase-admin');

const express = require('express');
const cors = require('cors');
const app = express();
const markdown = require('markdown-it');

const md = markdown({
  html: true,
});

admin.initializeApp();

exports.saveAuthentication = functions.auth.user().onCreate(async user => {
  logger.debug('User logged in ->', user);

  await admin.auth().setCustomUserClaims(user.uid, {
    disabled: true,
  });

  return await admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .create({
      displayName: user.displayName || 'No name',
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/addPost', async (req, res) => {
  const data = req.body.data;
  data.createdAt = admin.firestore.FieldValue.serverTimestamp();
  data.updatedAt = admin.firestore.FieldValue.serverTimestamp();
  data.isDraft = true;

  await admin.firestore().runTransaction(async transaction => {
    const { tags = [] } = data;

    tags.forEach(async val => {
      const tagRef = admin.firestore().doc(`tags/${val}`);
      const tagSnapShot = await transaction.get(tagRef);

      const count = tagSnapShot.get('count') || 0;
      transaction.set(tagRef, { count: count + 1 });
    });

    const writeResult = await admin.firestore().collection('posts').add(data);
    res.json({ id: writeResult.id });
  });
});

app.post('/fetchPosts', async (req, res) => {
  const posts = await admin.firestore().collection('posts').get();

  const data = posts.docs.map(doc => {
    const _doc = doc.data();
    return Object.assign(_doc, { body: md.render(_doc.body) });
  });

  res.json({ data });
});

exports.handler = functions.https.onRequest(app);
