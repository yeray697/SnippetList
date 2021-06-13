import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Section from './Section';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { MenuActions } from './MenuFooter';

type Props = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  isPinned: boolean;
  onPinnedItemChange(id: number, isPinned: boolean): void;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(1.5),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    description: {
      fontWeight: 'lighter',
      overflow: 'hidden',
      fontSize: '0.85rem',
      wordBreak: 'break-word',
      display: '-webkit-box',
      '-webkit-line-clamp': 4,
      '-webkit-box-orient': 'vertical',
    },
    snackbarButton: {
      color: '#FFFFFF', //ToDo Theme
    },
  })
);

const SnippetItem = ({
  id,
  title,
  description,
  tags,
  isPinned,
  onPinnedItemChange,
}: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const snackbar = useSnackbar();
  const [pinned, setPinned] = useState(isPinned);
  const { enqueueSnackbar } = useSnackbar();

  const actions: MenuActions[] = [
    {
      id: 'Edit',
      name: 'Edit',
      icon: <EditIcon color="action" />,
    },
    {
      id: 'Like',
      name: pinned ? 'Unlike' : 'Like',
      icon: pinned ? (
        <FavoriteIcon color="action" />
      ) : (
        <FavoriteBorderIcon color="action" />
      ),
    },
    {
      id: 'Delete',
      name: 'Delete',
      icon: <DeleteIcon color="action" />,
    },
  ];
  const onSnackbarClickDismiss = (key: SnackbarKey) => {
    snackbar.closeSnackbar(key);
  };

  function handleMenuItemClick(action: string) {
    switch (action) {
      case 'Edit':
        history.push('/snippet/edit/' + id.toString());
        break;
      case 'Like':
        setPinned(!pinned);
        isPinned = !pinned;
        onPinnedItemChange(id, isPinned);
        break;
    }
  }

  function onCopyButtonClicked() {
    enqueueSnackbar('Copied!', {
      variant: 'info',
      action: key => (
        <Button
          onClick={() => onSnackbarClickDismiss(key)}
          className={classes.snackbarButton}
        >
          Dismiss
        </Button>
      ),
      autoHideDuration: 2500,
    });
  }

  return (
    <Paper elevation={3} variant="outlined">
      <Header title={title} onCopyButtonClicked={onCopyButtonClicked} />
      <Section className={classes.section}>
        <Typography variant="body1" className={classes.description}>
          {description}
        </Typography>
      </Section>

      <Section className={classes.section}>
        <Footer
          tags={tags}
          actions={actions}
          handleClickMenuItem={handleMenuItemClick}
        />
      </Section>
    </Paper>
  );
};

export default SnippetItem;
