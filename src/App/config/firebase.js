import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyA0_hwv6ruIK14ngSraBSK8_Yatl_ppFtY",
  authDomain: "re-invent-58c92.firebaseapp.com",
  databaseURL: "https://re-invent-58c92.firebaseio.com",
  projectId: "re-invent-58c92",
  storageBucket: "re-invent-58c92.appspot.com",
  messagingSenderId: "243898729451",
  appId: "1:243898729451:web:768854623fee40e7d1cfae",
  measurementId: "G-1BB6X0E7YQ"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;