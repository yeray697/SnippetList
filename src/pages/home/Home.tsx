import SnippetListContainer from '../../components/snippet_list/SnippetListContainer';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SnippetPage from '../snippet/Snippet';
import { auth, loginAnonymous } from '../../service/firebase/firebaseManager';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
  const [userAuth, loginLoading] = useAuthState(auth);

  useEffect(() => {
    if (loginLoading || (userAuth && !userAuth.isAnonymous)) return;
    loginAnonymous(onErrorLogin);
  }, [loginLoading, userAuth]);

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
      <SnippetListContainer />
    </>
  );
};

export default Home;
