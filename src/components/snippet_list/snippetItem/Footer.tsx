import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';
import ChipContainer from '../../ChipContainer/ChipContainer';
import MenuFooter, { MenuActions } from './MenuFooter';

interface Props {
  tags: string[];
  actions: MenuActions[];
  className?: string;
  handleClickMenuItem(actionId: string): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      paddingBottom: theme.spacing(2),
      justifyContent: 'space-between',
    },
    chipContainer: {
      marginRight: theme.spacing(1),
      width: '100%',
    },
  })
);

const Footer: FC<Props> = ({ tags, actions, handleClickMenuItem }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {tags && tags.length > 0 && (
        <ChipContainer tagList={tags} className={classes.chipContainer} />
      )}
      <MenuFooter actions={actions} handleClickMenuItem={handleClickMenuItem} />
    </div>
  );
};

export default Footer;
