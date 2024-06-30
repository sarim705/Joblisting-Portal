import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgG9ZMLNO-2yXhZn7peNEFW17x1-7PB4Q",
  authDomain: "job-portal-fb214.firebaseapp.com",
  projectId: "job-portal-fb214",
  storageBucket: "job-portal-fb214.appspot.com",
  messagingSenderId: "395632641186",
  appId: "1:395632641186:web:62571f65e7208bb00a83fb",
  measurementId: "G-G12N21BJLT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const firestore = getFirestore();

export { firebaseApp, analytics, firestore };

