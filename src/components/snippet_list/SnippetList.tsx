import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import Snippet from '../../model/snippet';
import SnippetItem from './snippetItem/SnippetItem';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

type ListProps = {
  items: Snippet[];
  onPinnedItemChange(id: string, isPinned: boolean): void;
  onCopyButtonClicked(script: string): void;
  onEditButtonClicked(selectedItem: Snippet): void;
  onDeleteButtonClicked(id: string): void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginLeft: theme.spacing(-3),
      width: 'auto',
    },
    column: {
      paddingLeft: theme.spacing(3),
      backgroundClip: 'padding-box',
      '& > div': {
        marginBottom: theme.spacing(3),
      },
    },
  })
);

const SnippetList = ({
  items,
  onPinnedItemChange,
  onCopyButtonClicked,
  onEditButtonClicked,
  onDeleteButtonClicked,
}: ListProps) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const onEditButtonClick = (id: string) => {
    var item = items.find(i => i.id === id);
    if (item) onEditButtonClicked(item);
  };

  return (
    <Masonry
      breakpointCols={theme.breakpointColumnsObj}
      className={classes.root}
      columnClassName={classes.column}
    >
      {items.map((item, i) => (
        <motion.div layoutId={item.id} key={item.id}>
          <SnippetItem
            id={item.id}
            title={item.title}
            description={item.description}
            tags={item.tags}
            isPinned={item.pinned}
            onPinnedItemChange={onPinnedItemChange}
            onCopyButtonClicked={onCopyButtonClicked}
            onEditButtonClicked={onEditButtonClick}
            onDeleteButtonClicked={onDeleteButtonClicked}
          />
        </motion.div>
      ))}
    </Masonry>
  );
};

export default SnippetList;
