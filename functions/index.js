const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const logger = functions.logger;
const firestore = admin.firestore();
const auth = admin.auth();

exports.onLogin = functions.auth.user().onCreate(async user => {
  logger.debug('User logged in ->', user);

  await auth.setCustomUserClaims(user.uid, {
    admin: false,
  });

  return await firestore
    .collection('users')
    .doc(user.uid)
    .create({
      displayName: user.displayName || 'Unknown',
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});
