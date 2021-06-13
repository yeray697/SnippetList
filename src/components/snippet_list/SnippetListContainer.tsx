import { Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import Snippet from '../../model/snippet';
import Search from './Search';
import SnippetList from './SnippetList';

type ListProps = {
  items: Snippet[];
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
  })
);

const SnippetListContainer = ({ items }: ListProps) => {
  const classes = useStyles();
  const [pinnedItems, setPinnedItems] = useState(items.filter(i => i.pinned));
  const [nonPinnedItems, setNonPinnedItems] = useState(
    items.filter(i => !i.pinned)
  );

  function onPinnedItemChange(id: number, isPinned: boolean) {
    let aux = items.find(i => i.id === id);
    if (aux) aux.pinned = isPinned;
    setPinnedItems(items.filter(i => i.pinned));
    setNonPinnedItems(items.filter(i => !i.pinned));
  }
  return (
    <div>
      <Search availableTags={['tag1', 'tag2']} />
      {pinnedItems && pinnedItems.length > 0 && (
        <div className={classes.pinnedItems}>
          <Typography variant="body2" component="h1" className={classes.title}>
            Liked
          </Typography>
          <SnippetList
            items={pinnedItems}
            onPinnedItemChange={onPinnedItemChange}
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SnippetListContainer;
