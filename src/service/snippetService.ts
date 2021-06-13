import Snippet from '../model/snippet';
import { getDatabase } from './firebase/firebaseManager';

interface SnippetViewEntity {
    [key: string]: Snippet
}
const snippetsPath = 'snippets/';
  
const getSnippets = (onSuccess: (snippets: Snippet[])=> void, onError: (exception: Error) => void) => {
    return getDatabase().ref('snippets/').get().then(snapshot =>{
        if (snapshot.exists()) {
            let data: SnippetViewEntity = snapshot.val();

            let snippets: Snippet[] = Object.entries(data).map(([key, value]) => {
                value.id = key;
                return value;
            });
            onSuccess(snippets);
          } else onError(new Error("Error"));
    }).catch(exception => {
        onError(exception);
    });
}

//ToDo implement the real time database
// const listenSnippets = () => {
//     getDatabase()
//         .ref(snippetsPath)
//         .on('value', (snapshot) => {
//             const data = snapshot.val();

//         })
// }

const addSnippet = (snippet: Snippet) => {
    let id = getDatabase().ref(snippetsPath).push().key;
    if (id) {
        snippet.id = id;
        getDatabase().ref(snippetsPath + snippet.id).set({
            title: snippet.title,
            description: snippet.description,
            tags: snippet.tags,
            pinned: snippet.pinned
        });
    }
}

const addAll = (snippets: Snippet[]) => {
    snippets.forEach(element => {
        addSnippet(element);
    });
}

const editSnippet = (snippet: Snippet) => {
    getDatabase().ref(snippetsPath + snippet.id).update(snippet)
}

const removeSnippet = (id: string) => {
    getDatabase().ref(snippetsPath + id).remove();
}

export {getSnippets, addSnippet, editSnippet, removeSnippet, addAll}