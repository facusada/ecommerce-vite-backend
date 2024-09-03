import admin from 'firebase-admin';

const db = admin.firestore();
const tokensCollection = db.collection('tokens');

const saveToken = async (token, userId) => {
  await tokensCollection.doc(token).set({ userId, createdAt: new Date() });
};

const invalidateToken = async (token) => {
  await tokensCollection.doc(token).delete();
};

const isTokenValid = async (token) => {
  const doc = await tokensCollection.doc(token).get();
  return doc.exists;
};

export {
  saveToken,
  invalidateToken,
  isTokenValid,
}