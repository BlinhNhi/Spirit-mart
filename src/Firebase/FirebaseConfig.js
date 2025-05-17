// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzobAmcN1zfVrXqneeNTH_96IboAEhWjA",
    authDomain: "spiritecomerce.firebaseapp.com",
    projectId: "spiritecomerce",
    storageBucket: "spiritecomerce.firebasestorage.app",
    messagingSenderId: "529501641847",
    appId: "1:529501641847:web:6981ee6a8c827b6c2b3a72"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }