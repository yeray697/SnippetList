import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Section from './Section';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from './Header';
import Footer from './Footer';
import { MenuActions } from './MenuFooter';
import Tag from '../../../model/tag';

type Props = {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  isPinned: boolean;
  onPinnedItemChange(id: string, isPinned: boolean): void;
  onCopyButtonClicked(script: string): void;
  onEditButtonClicked(id: string): void;
  onDeleteButtonClicked(id: string): void;
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

  const [pinned, setPinned] = useState(isPinned);

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

  function handleMenuItemClick(action: string) {
    switch (action) {
      case 'Edit':
        onEditButtonClicked(id);
        break;
      case 'Like':
        setPinned(!pinned);
        isPinned = !pinned;
        onPinnedItemChange(id, isPinned);
        break;
      case 'Delete':
        onDeleteButtonClicked(id);
        break;
    }
  }

  function onCopyButtonClick() {
    onCopyButtonClicked(title); //ToDo: this should be the snippet content.
  }

  return (
    <Paper elevation={3} variant="outlined">
      <Header title={title} onCopyButtonClicked={onCopyButtonClick} />
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
