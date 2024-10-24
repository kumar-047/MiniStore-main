// firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAYw1k6yJKqV-2i8ev4CJqzzze5TUS8lXk",
    authDomain: "ecommerce-8c80c.firebaseapp.com",
    projectId: "ecommerce-8c80c",
    storageBucket: "ecommerce-8c80c.appspot.com",
    messagingSenderId: "760658043726",
    appId: "1:760658043726:web:78995a7b47fbfe9704741f",
    measurementId: "G-MY7S8RDTZ4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
