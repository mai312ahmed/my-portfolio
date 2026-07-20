import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAVGQRUb0oMosSU3l_-RZvl5dGwhKU32Ww",
  authDomain: "portfolio-mai-3126.firebaseapp.com",
  projectId: "portfolio-mai-3126",
  storageBucket: "portfolio-mai-3126.firebasestorage.app",
  messagingSenderId: "398246676556",
  appId: "1:398246676556:web:96e88d630986424adbcce9",
  measurementId: "G-REKDTB4W25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
