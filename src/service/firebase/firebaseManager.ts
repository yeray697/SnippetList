import firebase from 'firebase'

const initFirebase = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyAFLr00SsD85RQ92MpqQgqwj7xzIhroZ8I",
        authDomain: "snippetpwa.firebaseapp.com",
        databaseURL: "https://snippetpwa-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "snippetpwa",
        storageBucket: "snippetpwa.appspot.com",
        messagingSenderId: "588780481414",
        appId: "1:588780481414:web:deb2083428f47a5f935a07",
        measurementId: "G-69671P44PE"
      };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const getDatabase = () => firebase.database();

export {initFirebase, getDatabase};