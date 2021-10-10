import { Button, CircularProgress, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Snippet from '../../model/snippet';
import { useObjectVal } from 'react-firebase-hooks/database';
import User from '../../model/user';
import { mapFromDto as mapUserFromDto } from '../../mapper/userMapper';
//ToDo
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { editSnippet, removeSnippet } from '../../service/snippetService';
import Search from './Search';
import SnippetList from './SnippetList';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { auth, db } from '../../service/firebase/firebaseManager';
import SelectedSnippet from './SelectedSnippet';
import { useCallback, useEffect, useState } from 'react';
import Dialog from '../Dialog/Dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 400,
      fontSize: '13px',
      letterSpacing: '0.8px',
      color: 'rgb(95,99,104)',
      lineHeight: '16px',
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1.5),
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
      textTransform: 'uppercase',
    },
    pinnedItems: {
      marginBottom: theme.spacing(4),
    },
    snackbarButton: {
      color: theme.palette.common.white,
    },
    loadingContainer: {
      width: '100%',
      paddingTop: '15%',
      display: 'flex',
      justifyContent: 'center',
    },
  })
);
type Props = {
  selectedSnippetId: string | null;
};
const SnippetListContainer = ({ selectedSnippetId }: Props) => {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [user, userDataLoading] = useObjectVal<User>(
    db.ref('users/' + auth?.currentUser?.uid),
    {
      keyField: 'id',
      transform: mapUserFromDto,
    }
  );

  function onPinnedItemChange(id: string) {
    let aux = getSnippets()?.find(i => i.id === id);
    if (aux) {
      aux.pinned = !aux.pinned;
      editSnippet(aux);
    }
  }

  function onCopyButtonClicked(content: string) {
    //ToDo Copy to clipboard
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

  function onEditButtonClicked(item: Snippet) {
    history.push(item.id);
  }

  function onDeleteButtonClicked(id: string) {
    //ToDo Dialog to confirm the action
    //This will be commented until the dialog to confirm the delete is done
    //Maybe modify the hard delete and use a soft delete?
    //It's working tho
    //removeSnippet(id);
  }

  const onSnackbarClickDismiss = (key: SnackbarKey) => {
    snackbar.closeSnackbar(key);
  };

  const getSnippets = useCallback(() => {
    return user?.snippets;
  }, [user]);

  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | undefined>(
    undefined
  );

  useEffect(() => {
    const newSnippetSelected = getSnippets()?.find(
      s => s.id === selectedSnippetId
    );
    setSelectedSnippet(newSnippetSelected);
  }, [selectedSnippetId, getSnippets]);

  return (
    <div>
      {userDataLoading && (
        <div className={classes.loadingContainer}>
          {' '}
          <CircularProgress />{' '}
        </div>
      )}
      {!userDataLoading && (
        <>
          <Search availableTags={['tag1', 'tag2']} />
          <AnimateSharedLayout type="crossfade">
            <section
              className={classes.pinnedItems}
              style={{
                display: getSnippets()?.some(s => s.pinned) ? 'block' : 'none',
              }}
            >
              <Typography
                variant="body2"
                component="h2"
                className={classes.title}
              >
                Liked
              </Typography>
              <SnippetList
                items={getSnippets()?.filter(s => s.pinned)!!}
                onPinnedItemChange={onPinnedItemChange}
                onCopyButtonClicked={onCopyButtonClicked}
                onEditButtonClicked={onEditButtonClicked}
                onDeleteButtonClicked={onDeleteButtonClicked}
              />
            </section>
            <section
              style={{
                display: getSnippets()?.some(s => !s.pinned) ? 'block' : 'none',
              }}
            >
              <Typography
                variant="body2"
                component="h2"
                className={classes.title}
              >
                Others
              </Typography>
              <SnippetList
                items={getSnippets()?.filter(s => !s.pinned)!!}
                onPinnedItemChange={onPinnedItemChange}
                onCopyButtonClicked={onCopyButtonClicked}
                onEditButtonClicked={onEditButtonClicked}
                onDeleteButtonClicked={onDeleteButtonClicked}
              />
            </section>

            <AnimatePresence initial={true}>
              {selectedSnippet && (
                <Dialog onCloseToRoute="/">
                  <SelectedSnippet
                    key={selectedSnippetId}
                    id={selectedSnippet.id}
                    title={selectedSnippet.title}
                    description={selectedSnippet.description}
                    tags={selectedSnippet.tags}
                    isPinned={selectedSnippet.pinned}
                  />
                </Dialog>
              )}
            </AnimatePresence>
          </AnimateSharedLayout>
        </>
      )}
    </div>
  );
};

export default SnippetListContainer;
