import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithGoogle } from '../../service/firebase/firebaseManager';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginBottom: theme.spacing(4) },
    appBar: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    space: theme.mixins.toolbar,
  })
);

const Header = () => {
  const classes = useStyles();
  const [user, loading] = useAuthState(auth);
  function onLoginWithGoogleClicked() {
    loginWithGoogle(onErrorLogin);
  }

  function onErrorLogin(exception: Error) {
    console.log(exception);
  }
  return (
    <nav className={classes.root}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Snippets
          </Typography>
          {!loading && (!user || user.isAnonymous) && (
            <Button color="inherit" onClick={() => onLoginWithGoogleClicked()}>
              Login with Google
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.space}></div>
    </nav>
  );
};

export default Header;
