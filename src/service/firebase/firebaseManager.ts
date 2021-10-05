import firebase from 'firebase';
import { mergeAccounts } from '../snippetService';

const firebaseConfig = {
  apiKey: 'AIzaSyAFLr00SsD85RQ92MpqQgqwj7xzIhroZ8I',
  authDomain: 'snippetpwa.firebaseapp.com',
  databaseURL:
    'https://snippetpwa-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'snippetpwa',
  storageBucket: 'snippetpwa.appspot.com',
  messagingSenderId: '588780481414',
  appId: '1:588780481414:web:deb2083428f47a5f935a07',
  measurementId: 'G-69671P44PE',
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
};
const loginWithGoogle = async (onError: (exception: Error) => void) => {
  const anonymousUser = auth?.currentUser;
  if (anonymousUser && anonymousUser.isAnonymous) {
    anonymousUser
      .linkWithPopup(googleProvider)
      .then(function (user) {})
      .catch(function (error) {
        var errorCode = error.code;
        if (errorCode === 'auth/credential-already-in-use') {
          return firebase.auth().signInWithCredential(error.credential);
        }
      })
      .then(result => {
        if (result?.user && anonymousUser.uid !== result.user.uid) {
          return anonymousUser.delete().then(() => {
            mergeAccounts(result.user!!, anonymousUser.uid);
            return result;
          });
        }
        return result;
      });
  }
};

const logout = () => {
  if (auth) auth.signOut();
};

export { app, analytics, db, auth, loginAnonymous, loginWithGoogle, logout };
