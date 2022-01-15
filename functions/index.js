const functions = require('firebase-functions');
const admin = require('firebase-admin');
const logger = functions.logger;

admin.initializeApp();

exports.saveAuthentication = functions.auth.user().onCreate(user => {
  logger.debug('User logged in ->', user);

  return admin.firestore().collection('users').doc(user.uid).create({
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    createdAt: user.metadata.creationTime,
  });
});

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const writeResult = await admin
    .firestore()
    .collection('messages')
    .add({ original: original });
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
