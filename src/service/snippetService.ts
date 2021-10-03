import Snippet from '../model/snippet';
import { auth, db } from './firebase/firebaseManager';
import { mapFromDto as mapUserFromDto, mapFromModel as mapUserFromModel, mapFromSnapshot as mapUserFromSnapshot } from '../mapper/userMapper';
import { mapFromModel as mapSnippetFromModel } from '../mapper/snippetMapper';
import User from '../model/user';
import UserDTO from '../model/DTO/userDto';
import firebase from 'firebase/app';

const usersPath = 'users/';
const snippetsPath = 'snippets/';

const getUserId = () => {
    return '-MgRTgZAHM0tJ4mixQH0';
}

const getUser = (user: firebase.User, onSuccess: (user: User)=> void, onError: (exception: Error) => void) => {
    db
        .ref(usersPath+user.uid)
        .get()
        .then(snapshot =>{
        if(!snapshot.exists()) {
            addDefaultUser(user, onSuccess, onError)
        } else {
            onSuccess(mapUserFromSnapshot(snapshot));
        }
        })
        .catch(exception => {onError(exception)});
}
  
const addDefaultUser = (user: firebase.User, onSuccess: (user: User)=> void, onError: (exception: Error) => void) => {
    let newUser: UserDTO = {
            name: user.displayName?? "Anonymous"
            ,snippets: {}
            ,tags: {}
        } 
    db.ref(usersPath + user.uid)
    .set(newUser)
    onSuccess(mapUserFromDto(user.uid, newUser));
}

const editSnippet = (snippet: Snippet) => {
    if (auth.currentUser) {
        db.ref(usersPath + auth.currentUser?.uid + "/" + snippetsPath + snippet.id).update(mapSnippetFromModel(snippet))
    }
}

const removeSnippet = (id: string) => {
    if (auth.currentUser) {
        db.ref(usersPath + auth.currentUser?.uid + "/" + id).remove();
    }
}

export {getUser, editSnippet, removeSnippet}