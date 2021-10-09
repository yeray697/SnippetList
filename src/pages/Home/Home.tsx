import SnippetListContainer from '../../components/SnippetList/SnippetListContainer';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { auth, loginAnonymous } from '../../service/firebase/firebaseManager';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = ({ match }: RouteComponentProps<{ id?: string }>) => {
  let selectedSnippetId: string | null = match.params.id ?? null;
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
      <SnippetListContainer selectedSnippetId={selectedSnippetId} />
    </>
  );
};

export default Home;
