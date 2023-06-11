import { getFirestore, addDoc, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

import { app } from '../firebase';

const db = getFirestore(app);

export async function createOrder(order) {
  const docRef = await addDoc(collection(db, "orders"), order);

  return docRef.id;
}

export async function getAllOrders() {
  const docs = [];
  const querySnapshot = await getDocs(collection(db, "orders"));
  querySnapshot.forEach((doc) => {
    const docData = {
      id: doc.id,
      ...doc.data(),
    };

    docs.push(docData);
  });

  return docs;
}

export async function getOrder(id) {
  const docRef = doc(db, "orders", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function updateOrder(id, updates) {
  const orderRef = doc(db, "orders", id);

  await updateDoc(orderRef, updates);
}

export async function deleteOrder(id) {
  await deleteDoc(doc(db, "orders", id));
}

export function updateOrders() {}