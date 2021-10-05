import SnippetListContainer from '../../components/snippet_list/SnippetListContainer';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SnippetPage from '../snippet/Snippet';
import {
  auth,
  db,
  loginAnonymous,
} from '../../service/firebase/firebaseManager';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal } from 'react-firebase-hooks/database';
import User from '../../model/user';
import { mapFromDto as mapUserFromDto } from '../../mapper/userMapper';

const Home = () => {
  const [userAuth, loginLoading] = useAuthState(auth);

  useEffect(() => {
    if (loginLoading || (userAuth && !userAuth.isAnonymous)) return;
    loginAnonymous(onErrorLogin);
  }, [loginLoading, userAuth]);

  const [user, userDataLoading] = useObjectVal<User>(
    db.ref('users/' + auth?.currentUser?.uid),
    {
      keyField: 'id',
      transform: mapUserFromDto,
    }
  );

  function onErrorLogin(exception: Error) {
    console.log(exception);
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/snippet/edit/:id(\d+)" component={SnippetPage} />
          <Route exact path="/snippet/add" component={SnippetPage} />
          <Route exact path="/snippet/:id(\d+)" component={SnippetPage} />
        </Switch>
      </BrowserRouter>
      {!userDataLoading && user && user.snippets && (
        <SnippetListContainer items={user.snippets} />
      )}
    </>
  );
};

export default Home;
