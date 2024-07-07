// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1KN7HQUI266BgGSx0C48_yd4K_vKm5Eg",
  authDomain: "firmadigital-da23f.firebaseapp.com",
  projectId: "firmadigital-da23f",
  storageBucket: "firmadigital-da23f.appspot.com",
  messagingSenderId: "407096351567",
  appId: "1:407096351567:web:af149534f43da1ca98833a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
