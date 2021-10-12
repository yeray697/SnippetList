import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { motion, useIsPresent } from 'framer-motion';
import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  onCloseToRoute: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      zIndex: theme.zIndex.appBar + 1,
      position: 'fixed',
      background: 'rgba(0, 0, 0, 0.6)',
      willChange: 'opacity',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
    },
    dialog: {
      zIndex: theme.zIndex.appBar + 2,
      top: 0,
      overflow: 'hidden',
      padding: 0,
      width: '90%',
      margin: '5% auto',
      [theme.breakpoints.up('sm')]: {
        width: '80%',
      },
      [theme.breakpoints.up('md')]: {
        width: '70%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '60%',
      },
      [theme.breakpoints.up('xl')]: {
        width: '50%',
      },
      //Override browser styles
      borderWidth: '0px',
      backgroundColor: '#0000',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

const Dialog: FC<Props> = ({ children, onCloseToRoute }) => {
  const classes = useStyles();
  const history = useHistory();
  const isPresent = useIsPresent();
  function onClose() {
    history.push(onCloseToRoute);
  }

  const getVariants = useCallback(() => {
    return {
      initial: { opacity: isPresent ? 0 : 1 },
      animate: { opacity: isPresent ? 1 : 0 },
    };
  }, [isPresent]);
  return (
    <div>
      <motion.div
        key={'backdrop-dialog'}
        initial="initial"
        animate="animate"
        variants={getVariants()}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: 'auto' }}
        className={classes.overlay}
        onClick={onClose}
      />
      <dialog open className={classes.dialog}>
        <motion.div>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </motion.div>
        {children}
      </dialog>
    </div>
  );
};

export default Dialog;
