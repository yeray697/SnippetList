import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import Snippet from '../../model/snippet';
import SnippetItem from './snippetItem/SnippetItem';
import Masonry from 'react-masonry-css';
import { AnimateSharedLayout, motion } from 'framer-motion';

type ListProps = {
  items: Snippet[];
  onPinnedItemChange(id: number, isPinned: boolean): void;
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

const SnippetList = ({ items, onPinnedItemChange }: ListProps) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  return (
    <AnimateSharedLayout>
      <Masonry
        breakpointCols={theme.breakpointColumnsObj}
        className={classes.root}
        columnClassName={classes.column}
      >
        {items.map((item, i) => (
          <motion.div layoutId={item.id.toString()} key={item.id}>
            <SnippetItem
              id={item.id}
              title={item.title}
              description={item.description}
              tags={item.tags}
              isPinned={item.pinned}
              onPinnedItemChange={onPinnedItemChange}
            />
          </motion.div>
        ))}
      </Masonry>
    </AnimateSharedLayout>
  );
};

export default SnippetList;
