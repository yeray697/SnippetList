import Tag from '../../model/tag';
import { motion } from 'framer-motion';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Paper, Theme } from '@material-ui/core';
import ChipContainer from '../Chips/ChipContainer';

interface Props {
  id?: string;
  title?: string;
  description?: string;
  tags?: Tag[];
  isPinned?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      maxWidth: '50%',
      overflow: 'hidden',
      pointerEvents: 'auto',
      position: 'relative',
      width: '100%',
      height: '100%',
      margin: '0px auto',
      padding: '2%',
      '& > .MuiPaper-root': {
        padding: '5%',
        width: '100%',
        height: '100%',
        borderRadius: theme.spacing(2),
      },
    },
  })
);

function SelectedSnippet({ id, title, description, tags, isPinned }: Props) {
  const classes = useStyles();
  return (
    <motion.article layoutId={`snippet-item-${id}`} className={classes.content}>
      <Paper>
        <motion.div layoutId={`snippet-item-title-${id}`}>{title}</motion.div>
        <motion.div layoutId={`snippet-item-description-${id}`}>
          {description}
        </motion.div>
        {tags && tags.length > 0 && (
          <motion.div layoutId={`snippet-item-tags-${id}`}>
            <ChipContainer
              tagList={tags} //className={classes.chipContainer}
            />
          </motion.div>
        )}
      </Paper>
    </motion.article>
  );
}

export default SelectedSnippet;
