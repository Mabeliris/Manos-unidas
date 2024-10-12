// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-qh0K41q63ZHqZh3AlzlWeyaEmB-LzjI",
  authDomain: "manos-unidas-60bdd.firebaseapp.com",
  projectId: "manos-unidas-60bdd",
  storageBucket: "manos-unidas-60bdd.appspot.com",
  messagingSenderId: "266487164971",
  appId: "1:266487164971:web:7c4756960097070a543a6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);





