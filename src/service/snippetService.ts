import Snippet from '../model/snippet';
import { auth, db } from './firebase/firebaseManager';
import {
  mapFromDto as mapUserFromDto,
  mapFromSnapshot as mapUserFromSnapshot,
  mapFromModel as mapUserFromModel,
} from '../mapper/userMapper';
import { mapFromModel as mapSnippetFromModel } from '../mapper/snippetMapper';
import User from '../model/user';
import UserDTO from '../model/DTO/userDto';
import firebase from 'firebase/app';

const usersPath = 'users/';
const snippetsPath = 'snippets/';

const getUser = (
  user: firebase.User,
  onSuccess: (user: User) => void,
  onError: (exception: Error) => void
) => {
  getUserById(user.uid)
    .then(snapshot => {
      if (!snapshot.exists()) {
        addDefaultUser(user, onSuccess);
      } else {
        onSuccess(mapUserFromSnapshot(snapshot));
      }
    })
    .catch(exception => {
      onError(exception);
    });
};

const getUserById = (userId: string) => {
  return db.ref(usersPath + userId).get();
};

const addDefaultUser = (
  user: firebase.User,
  onSuccess: (user: User) => void
) => {
  let newUser: UserDTO = {
    name: user.displayName ?? 'Anonymous',
    snippets: {},
    tags: {},
  };
  db.ref(usersPath + user.uid).set(newUser);
  onSuccess(mapUserFromDto(user.uid, newUser));
};

const mergeAccounts = (authUser: firebase.User, anonymousUserId: string) => {
  let anonymousUser: User;
  getUserById(anonymousUserId)
    .then(snapshot => {
      if (snapshot.exists()) {
        anonymousUser = mapUserFromSnapshot(snapshot);
      }
    })
    .then(() => {
      if (anonymousUser.snippets && anonymousUser.snippets.length) {
        getUserById(authUser.uid).then(snapshot => {
          if (snapshot.exists()) {
            const newUser = mapUserFromSnapshot(snapshot);
            console.log(anonymousUser);
            console.log(newUser);
            newUser.snippets = [...newUser.snippets, ...anonymousUser.snippets];
            newUser.tags = [...newUser.tags, ...anonymousUser.tags];
            console.log(newUser);
            const mappedUser = mapUserFromModel(newUser);
            console.log(mappedUser);
            db.ref(usersPath + authUser.uid).update(mappedUser);
          }
        });
      }
    });
};

const editSnippet = (snippet: Snippet) => {
  if (auth.currentUser) {
    db.ref(
      usersPath + auth.currentUser?.uid + '/' + snippetsPath + snippet.id
    ).update(mapSnippetFromModel(snippet));
  }
};

const removeSnippet = (id: string) => {
  if (auth.currentUser) {
    db.ref(usersPath + auth.currentUser?.uid + '/' + id).remove();
  }
};

export { getUser, mergeAccounts, editSnippet, removeSnippet };
