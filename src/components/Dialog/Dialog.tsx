import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { motion, useIsPresent } from 'framer-motion';
import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

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
      //Override browser styles
      borderWidth: '0px',
      backgroundColor: '#0000',
    },
    dialogContent: {
      width: '100%',
      height: '100%',
      display: 'block',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      right: 0,
      margin: '0px auto',
      position: 'fixed',
      zIndex: 2,
      overflow: 'hidden',
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
        <div className={classes.dialogContent}>{children}</div>
      </dialog>
    </div>
  );
};

export default Dialog;
