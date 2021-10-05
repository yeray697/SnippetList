import SnippetListContainer from '../../components/snippet_list/SnippetListContainer';
import { getUser } from '../../service/snippetService';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SnippetPage from '../snippet/Snippet';
import { auth, loginAnonymous } from '../../service/firebase/firebaseManager';
import { useAuthState } from 'react-firebase-hooks/auth';
import User from '../../model/user';

const Home = () => {
  const [userAuth, loading] = useAuthState(auth);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (loading || (userAuth && !userAuth.isAnonymous)) return;
    loginAnonymous(onErrorLogin);
  }, [loading, userAuth]);

  function onErrorLogin(exception: Error) {
    console.log(exception);
  }

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return;

    function onGetUserSuccessful(user: User) {
      setUser(user);
    }
    function onGetUserError(exception: Error) {
      console.log(exception);
    }

    getUser(userAuth, onGetUserSuccessful, onGetUserError);
  }, [userAuth, loading]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/snippet/edit/:id(\d+)" component={SnippetPage} />
          <Route exact path="/snippet/add" component={SnippetPage} />
          <Route exact path="/snippet/:id(\d+)" component={SnippetPage} />
        </Switch>
      </BrowserRouter>
      {user && user.snippets && <SnippetListContainer items={user.snippets} />}
    </>
  );
};

export default Home;
