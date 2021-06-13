import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginBottom: theme.spacing(4) },
    space: theme.mixins.toolbar,
  })
);

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6">Snippets</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.space}></div>
    </div>
  );
};

export default Header;
