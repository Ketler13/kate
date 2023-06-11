import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../firebase";

export async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return userCredential;
}

export async function signUp(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
  return userCredential;
}