import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAloBDyODduS_e3FJqYJLUj_FgwyQ1XW4",
  authDomain: "my-project-mobile-app-390312.firebaseapp.com",
  databaseURL:
    "https://my-project-mobile-app-390312-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-project-mobile-app-390312",
  storageBucket: "my-project-mobile-app-390312.appspot.com",
  messagingSenderId: "241252881444",
  appId: "1:241252881444:web:c54a831ee421d2c8db34b1",
  measurementId: "G-XCL5PL9N3Y",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
