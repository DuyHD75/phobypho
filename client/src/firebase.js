import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCypU58yX2MF7WLHnVrigFveubIFJAtWEg",
  authDomain: "phobypho-13784.firebaseapp.com",
  projectId: "phobypho-13784",
  storageBucket: "phobypho-13784.appspot.com",
  messagingSenderId: "332219407200",
  appId: "1:332219407200:web:4b5070d9997dae2be11c05",
  measurementId: "G-1XFYGFM6ZZ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };