import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// console.log(process.env.REACT_APP_DATABASE_URL);



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, app, db, storage } 



// const firebaseConfig = {
//   apiKey: "AIzaSyBO0gKBVOoLrhkN0iAEyCq-ruC0sKEkmqc",
//   authDomain: "baatchit-e5b41.firebaseapp.com",
//   projectId: "baatchit-e5b41",
//   databaseURL: "http://baatchit-e5b41.firebaseio.com ",
//   storageBucket: "baatchit-e5b41.appspot.com",
//   messagingSenderId: "169221924484",
//   appId: "1:169221924484:web:3731a1795744a39dd804d1"
// };