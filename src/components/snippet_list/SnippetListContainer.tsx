import { Button, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Snippet from '../../model/snippet';
import { editSnippet, removeSnippet } from '../../service/snippetService';
import Search from './Search';
import SnippetList from './SnippetList';
import { AnimateSharedLayout } from 'framer-motion';

type ListProps = {
  items: Snippet[] | undefined;
};

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
      marginBottom: theme.spacing(8),
    },
    snackbarButton: {
      color: theme.palette.common.white,
    },
  })
);

const SnippetListContainer = ({ items }: ListProps) => {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [pinnedItems, setPinnedItems] = useState(items?.filter(i => i.pinned));
  const [nonPinnedItems, setNonPinnedItems] = useState(
    items?.filter(i => !i.pinned)
  );

  function onPinnedItemChange(id: string, isPinned: boolean) {
    let aux = items?.find(i => i.id === id);
    if (aux) {
      aux.pinned = isPinned;
      editSnippet(aux);
    }
    setPinnedItems(items?.filter(i => i.pinned));
    setNonPinnedItems(items?.filter(i => !i.pinned));
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
    history.push('/snippet/edit/' + item.id);
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

  return (
    <div>
      <Search availableTags={['tag1', 'tag2']} />
      <AnimateSharedLayout>
        {pinnedItems && pinnedItems.length > 0 && (
          <div className={classes.pinnedItems}>
            <Typography
              variant="body2"
              component="h1"
              className={classes.title}
            >
              Liked
            </Typography>
            <SnippetList
              items={pinnedItems}
              onPinnedItemChange={onPinnedItemChange}
              onCopyButtonClicked={onCopyButtonClicked}
              onEditButtonClicked={onEditButtonClicked}
              onDeleteButtonClicked={onDeleteButtonClicked}
            />
          </div>
        )}
        <div>
          {nonPinnedItems && nonPinnedItems.length > 0 && (
            <div>
              <Typography
                variant="body2"
                component="h1"
                className={classes.title}
              >
                Others
              </Typography>
              <SnippetList
                items={nonPinnedItems}
                onPinnedItemChange={onPinnedItemChange}
                onCopyButtonClicked={onCopyButtonClicked}
                onEditButtonClicked={onEditButtonClicked}
                onDeleteButtonClicked={onDeleteButtonClicked}
              />
            </div>
          )}
        </div>
      </AnimateSharedLayout>
    </div>
  );
};

export default SnippetListContainer;
