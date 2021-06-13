import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';
import { FC, useRef } from 'react';
import OverflowTooltip from '../../OverflowTooltip/overflow_tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

interface Props {
  title: string;
  className?: string;
  onCopyButtonClicked(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    title: {
      fontWeight: 500,
      fontSize: '1.3rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      lineHeight: 1.45,
      textOverflow: 'ellipsis',
      marginRight: '16px',
    },
    iconContainer: {
      marginLeft: 'auto',
    },
  })
);

const Header: FC<Props> = ({ title, onCopyButtonClicked }) => {
  const classes = useStyles();
  const divRef = useRef<any>();
  return (
    <div className={classes.root}>
      <OverflowTooltip tooltip={title} divRef={divRef} placement="top">
        <div ref={divRef} className={classes.title}>
          {title}
        </div>
      </OverflowTooltip>
      <div className={classes.iconContainer}>
        <Tooltip title="Copy" placement="right">
          <IconButton
            aria-label="Copy"
            size="small"
            onClick={onCopyButtonClicked}
          >
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
