import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';
import MenuSnippet, { MenuActions } from './MenuSnippet';
import { IconButton, Tooltip } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    iconContainer: {
      marginLeft: 'auto',
      marginBottom: theme.spacing(1),
    },
  })
);

interface Props {
  handleButtonClick(actionId: string): void;
  actions: MenuActions[];
  className?: string;
}

const SideMenu: FC<Props> = ({ handleButtonClick, actions, className }) => {
  const classes = useStyles();
  return (
    <aside className={[classes.root, className].join(' ')}>
      <div className={classes.iconContainer}>
        <Tooltip title="Copy" placement="right">
          <IconButton
            aria-label="Copy"
            size="small"
            onClick={() => handleButtonClick('Copy')}
          >
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
      </div>
      <MenuSnippet actions={actions} handleClickMenuItem={handleButtonClick} />
    </aside>
  );
};

export default SideMenu;
