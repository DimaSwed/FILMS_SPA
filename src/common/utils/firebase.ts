import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

// Инициализация сервисов Firebase
// const auth = getAuth(app);
// const firestore = getFirestore(app);
// export { app, auth, firestore };
