import { Button } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

import {
  auth,
  loginAnonymous,
  loginWithGoogle,
} from '../../service/firebase/firebaseManager';
import { useHistory } from 'react-router-dom';

function Login() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  function onAnonymousLoginClicked() {
    loginAnonymous(onErrorLogin);
  }

  function onLoginWithGoogleClicked() {
    loginWithGoogle(onErrorLogin);
  }

  function onErrorLogin(exception: Error) {
    console.log(error);
  }

  useEffect(() => {
    if (loading) return;
    if (user) return history.replace('/');
  }, [user, loading, history]);

  return (
    <div>
      <Button onClick={() => onLoginWithGoogleClicked()}>
        Login with Google
      </Button>
      <Button onClick={() => onAnonymousLoginClicked()}>Anonymous login</Button>
    </div>
  );
}

export default Login;
