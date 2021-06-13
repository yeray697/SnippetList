import { FC, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import OverflowTooltip from '../OverflowTooltip/overflow_tooltip';

interface Props {
  tag: string;
}
const maxWidthChip = 100;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      maxWidth: theme.chip.maxWidth,
    },
    chipText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: maxWidthChip,
      fontWeight: 'lighter',
    },
  })
);

const ChipTooltip: FC<Props> = ({ tag }) => {
  const classes = useStyles();
  const divRef = useRef<any>();
  return (
    <OverflowTooltip tooltip={tag} divRef={divRef}>
      <Chip
        label={
          <div className={classes.chipText} ref={divRef}>
            {tag}
          </div>
        }
        size="small"
        variant="outlined"
        className={classes.chip}
      />
    </OverflowTooltip>
  );
};

export default ChipTooltip;
