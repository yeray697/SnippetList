import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface Props {
  open?: boolean;
  onClose?: () => void;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    backdrop: {
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundColor: '#0006',
    },
    dialogContainer: {
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: '50%',
    },
  })
);

const collapsedBackdrop = {
  opacity: 0,
};
const expandedBackdrop = {
  opacity: 1,
};

const Dialog: FC<Props> = ({ children, open = false, onClose }) => {
  const classes = useStyle();

  return (
    <div className={classes.container} key="backdrop">
      <motion.div
        onClick={onClose}
        className={classes.backdrop}
        initial={collapsedBackdrop}
        animate={expandedBackdrop}
        exit={collapsedBackdrop}
        transition={{
          duration: 0.5,
        }}
      ></motion.div>

      <dialog className={classes.dialogContainer}>
        <Paper>{children}</Paper>
      </dialog>
    </div>
  );
};

export default Dialog;
