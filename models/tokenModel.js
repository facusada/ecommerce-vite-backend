import admin from 'firebase-admin';

const db = admin.firestore();
const tokensCollection = db.collection('tokens');

export const saveToken = async (token, userId) => {
  await tokensCollection.doc(token).set({ userId, createdAt: new Date() });
};

export const invalidateToken = async (token) => {
  await tokensCollection.doc(token).delete();
};

export const isTokenValid = async (token) => {
  const doc = await tokensCollection.doc(token).get();
  return doc.exists;
};