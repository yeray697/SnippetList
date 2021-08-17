import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { FC, useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface Props {
  actions: MenuActions[];
  className?: string;
  handleClickMenuItem(actionId: string): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginLeft: 'auto' },
    menuItemPaddings: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
);

const MenuFooter: FC<Props> = ({ actions, handleClickMenuItem }) => {
  const classes = useStyles();
  function handleMenuItemClick(actionId: string) {
    setAnchorEl(null);
    handleClickMenuItem(actionId);
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <Tooltip title="Menu" placement="right">
        <IconButton
          aria-label="menu"
          size="small"
          onClick={handleClickListItem}
        >
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {actions.map((action, i) => {
          return (
            <Tooltip title={action.name} placement="right" key={action.id}>
              <MenuItem
                onClick={() => handleMenuItemClick(action.id)}
                classes={{ gutters: classes.menuItemPaddings }}
              >
                {action.icon}
              </MenuItem>
            </Tooltip>
          );
        })}
      </Menu>
    </div>
  );
};

export interface MenuActions {
  id: string;
  name: string;
  icon: JSX.Element;
}
export default MenuFooter;
