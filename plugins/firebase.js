require("dotenv").config();
// import firebase from "firebase/app";
// import "firebase/auth";

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     databaseURL: process.env.DATABASE_URL,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID
//   });
// }

// export default firebase;


import firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
  // firebase.initializeApp(config);
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  });
}

export const authProviders = {
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID
};

export const auth = firebase.auth();
