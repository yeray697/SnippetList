import Snippet from '../model/snippet';
import { auth, db } from './firebase/firebaseManager';
import {
  mapFromDtoWithId as mapUserFromDto,
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
        onSuccess(mapUserFromDto(snapshot.key!!, snapshot.val()));
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

const mergeAccounts = (newUser: firebase.User, oldUser: firebase.User) => {
  let anonymousUser: User;
  getUserById(oldUser.uid)
    .then(snapshot => {
      if (snapshot.exists()) {
        anonymousUser = mapUserFromDto(snapshot.key!!, snapshot.val());
      }
    })
    .then(() => {
      if (anonymousUser.snippets && anonymousUser.snippets.length) {
        getUserById(newUser.uid).then(snapshot => {
          if (snapshot.exists()) {
            db.ref(usersPath + newUser.uid).update(
              mergeUsersData(
                mapUserFromDto(snapshot.key!!, snapshot.val()),
                anonymousUser
              )
            );
          }
        });
      }
      removeUserData(oldUser);
    });
};

const mergeUsersData = (newUser: User, oldUser: User): UserDTO => {
  newUser.snippets = [...newUser.snippets, ...oldUser.snippets];
  newUser.tags = [...newUser.tags, ...oldUser.tags];
  return mapUserFromModel(newUser);
};

const removeUserData = (user: firebase.User) => {
  db.ref(usersPath + user.uid).remove();
  user.delete();
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
