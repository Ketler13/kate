import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import firebaseConfig from '../../../firebase.config.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };