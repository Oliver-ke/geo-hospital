import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

type firebaseConfigType = {
  apiKey: string | undefined,
  authDomain: string | undefined,
  databaseURL: string | undefined,
  projectId: string | undefined,
  storageBucket: string | undefined,
  messagingSenderId: string | undefined,
  appId: string | undefined,
}

const firebaseConfig: firebaseConfigType = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDGRID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export const cacheUserSearch = async (payload: string, userId: string) => {
  try {
    const docRef = await firestore.collection(`${userId}`).add({ query: payload });
    return docRef.id
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserSearch = (userId: string) => firestore.collection(`${userId}`)
  .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
    let searches: object[] = []
    querySnapshot.forEach((doc) => {
      searches.push(doc.data());
    });
    return searches
  })