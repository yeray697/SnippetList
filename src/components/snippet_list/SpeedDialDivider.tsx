import { createStyles, makeStyles, Theme } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: theme.spacing(5), //Fab size: 5 x 1 (default spacing)
    },
    divider: {
      position: 'absolute',
      width: '100%',
      margin: 'auto',
      top: '50%',
    },
    speedDial: {
      position: 'absolute',
      right: theme.spacing(-1.5),
      top: theme.spacing(-2.5),
    },
    speedDialFab: {
      zIndex: 'auto',
    },
    speedDialDirectionDown: {
      zIndex: 'auto',
    },
    speedDialActions: {
      //zIndex: theme.zIndex.speedDial + 1,
      //Overriding .MuiSpeedDial-directionDown .MuiSpeedDial-actions because those vars are hard coded (dialRadius and spacingActions)
      //https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDial/SpeedDial.js
      // marginTop: theme.spacing(2).toString() + 'px' + '!important',
      // paddingTop: '0px' + '!important',
    },
  })
);

export interface Action {
  icon: JSX.Element;
  name: string;
  onClick(): void;
}
interface Props {
  className?: string;
  actions: Action[];
}
const SpeedDialDivider = ({ className, actions }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (action: Action) => {
    action.onClick();
    setOpen(false);
  };
  return (
    <div className={[classes.root, className].join(' ')}>
      {/* <Divider className={classes.divider} /> */}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon openIcon={actions[0].icon} />}
        onClose={handleClose}
        onOpen={handleOpen}
        direction="down"
        open={open}
        FabProps={{
          size: 'small',
          onClick: () => handleClick(actions[0]),
        }}
        classes={{
          root: classes.speedDial,
          directionDown: classes.speedDialDirectionDown,
          fab: classes.speedDialFab,
          actions: classes.speedDialActions,
        }}
      >
        {actions.slice(1).map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClick(action)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default SpeedDialDivider;
