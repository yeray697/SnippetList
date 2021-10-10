import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tag from '../../../model/tag';
import SideMenu from './SideMenu';
import { MenuActions } from './MenuSnippet';
import Content from './Content';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  isPinned: boolean;
  onPinnedItemChange(id: string): void;
  onCopyButtonClicked(script: string): void;
  onEditButtonClicked(id: string): void;
  onDeleteButtonClicked(id: string): void;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      boxSizing: 'border-box',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(3),
    },
    mainContent: {
      overflow: 'hidden',
      width: '100%',
    },
    sideMenu: {
      marginLeft: theme.spacing(1.5),
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
  onCopyButtonClicked,
  onEditButtonClicked,
  onDeleteButtonClicked,
}: Props) => {
  const classes = useStyles();

  const actions: MenuActions[] = [
    {
      id: 'Edit',
      name: 'Edit',
      icon: <EditIcon color="action" />,
    },
    {
      id: 'Like',
      name: isPinned ? 'Unlike' : 'Like',
      icon: isPinned ? (
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

  function handleButtonClick(action: string) {
    switch (action) {
      case 'Edit':
        onEditButtonClicked(id);
        break;
      case 'Like':
        onPinnedItemChange(id);
        break;
      case 'Delete':
        onDeleteButtonClicked(id);
        break;
      case 'Copy':
        onCopyButtonClicked(title); //ToDo: this should be the snippet content.
        break;
    }
  }

  return (
    <AnimatePresence initial={false}>
      <motion.article layoutId={`snippet-item-${id}`}>
        <Paper elevation={3} variant="outlined" className={classes.root}>
          <Content
            className={classes.mainContent}
            id={id}
            title={title}
            description={description}
            tags={tags}
          />
          <SideMenu
            className={classes.sideMenu}
            actions={actions}
            handleButtonClick={handleButtonClick}
          />
        </Paper>
      </motion.article>
    </AnimatePresence>
  );
};

export default SnippetItem;
