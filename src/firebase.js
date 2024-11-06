import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxb6LE7APd5S2awcKSQ5zFduDBMv1AebU",
  authDomain: "operator-s-log.firebaseapp.com",
  projectId: "operator-s-log",
  storageBucket: "operator-s-log.firebasestorage.app",
  messagingSenderId: "1029240656576",
  appId: "1:1029240656576:web:37f3acac8570b28b829325",
  measurementId: "G-LLSF7MHY9E"
};

const firebaseApp = initializeApp(firebaseConfig);
// const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };

