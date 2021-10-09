import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithGoogle } from '../../service/firebase/firebaseManager';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(4),
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
    <>
      <AppBar position="fixed" color="primary" className={classes.root}>
        <nav>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Snippets
            </Typography>
            {!loading && (!user || user.isAnonymous) && (
              <Button
                color="inherit"
                onClick={() => onLoginWithGoogleClicked()}
              >
                Login with Google
              </Button>
            )}
          </Toolbar>
        </nav>
      </AppBar>
      <div className={classes.space}></div>
    </>
  );
};

export default Header;
