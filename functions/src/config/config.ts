import * as admin from 'firebase-admin';
admin.initializeApp();

export const firestore = admin.firestore();
export const storage = admin.storage();

// Sendinblue API Key
export const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;
export const sendinblueListIds = process.env.SENDINBLUE_LIST_IDS;
