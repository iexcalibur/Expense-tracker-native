// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCT66zEGtpyKGxzTQd_S9178xGXG1bifr4",
    authDomain: "expenseify-ex.firebaseapp.com",
    projectId: "expenseify-ex",
    storageBucket: "expenseify-ex.appspot.com",
    messagingSenderId: "34909428154",
    appId: "1:34909428154:web:1250ef676500d099e4e583"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;