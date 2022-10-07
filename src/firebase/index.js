import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwwq1L0-_5tw_RI0FGs1a9ViAIf_gctDE",
  authDomain: "native-chat-app-8c590.firebaseapp.com",
  databaseURL: "https://native-chat-app-8c590.firebaseio.com",
  projectId: "native-chat-app-8c590",
  storageBucket: "native-chat-app-8c590.appspot.com",
  messagingSenderId: "833713303615",
  appId: "1:833713303615:web:2a79e3834eef9dd781488a",
  measurementId: "G-TM6EY6HQ4K"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export{ firebase };



