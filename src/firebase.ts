import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCxR2GLQhkNOceanKv0kYPYHTQlEb2GXyw",
    authDomain: "todo-app-538e2.firebaseapp.com",
    databaseURL: "https://todo-app-538e2.firebaseio.com",
    projectId: "todo-app-538e2",
    storageBucket: "todo-app-538e2.appspot.com",
    messagingSenderId: "54611813535",
    appId: "1:54611813535:web:9548a0bf43c05b31d8eeaa"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();


