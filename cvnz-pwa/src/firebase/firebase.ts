
import firebase, { firestore } from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

export const myFirebase = firebase.initializeApp(firebaseConfig);

const fireDb = firebase.firestore();
fireDb.enablePersistence({ synchronizeTabs: true })
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log(err.code);
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log(err.code);
    }
  });
var t = fireDb;
export { fireDb }

export const db = fireDb;
