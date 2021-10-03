import SnippetListContainer from '../../components/snippet_list/SnippetListContainer';
import { getUser } from '../../service/snippetService';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import SnippetPage from '../snippet/Snippet';
import { auth } from '../../service/firebase/firebaseManager';
import { useAuthState } from 'react-firebase-hooks/auth';
import User from '../../model/user';

const Home = () => {
  const [userAuth, loading, error] = useAuthState(auth);
  const history = useHistory();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (loading) return;
    if (!userAuth) return history.replace('/Login');

    function onGetUserSuccessful(user: User) {
      console.log(user);
      setUser(user);
    }
    function onGetUserError(exception: Error) {
      console.log(exception);
    }

    getUser(userAuth, onGetUserSuccessful, onGetUserError);
  }, [userAuth, loading, history]);

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
