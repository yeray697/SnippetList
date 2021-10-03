import firebase from 'firebase'

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

const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const db = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const loginAnonymous = async (onError: (exception: Error) => void) => {
  if (auth) {
    try {
    await auth.signInAnonymously();
    } catch (err) {
      onError(err);
    }
  }
}
const loginWithGoogle = async (onError: (exception: Error) => void) => {
  if (auth) {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (err) {
      onError(err);
    }
  }
}

const logout = () => {
  if(auth)
    auth.signOut();
}

export {app, analytics, db, auth, loginAnonymous, loginWithGoogle, logout};