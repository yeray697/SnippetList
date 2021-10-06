import { FC, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import OverflowTooltip from '../OverflowTooltip/OverflowTooltip';
import Tag from '../../model/tag';

interface Props {
  tag: Tag;
  className?: string;
  onClick?: (item: any) => void;
  onDelete?: (item: any) => void;
  style?: React.CSSProperties;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.chip.margin,
      '&:last-child': {
        marginRight: 0,
      },
    },
    chipText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: theme.chip.maxWidth,
      fontWeight: 'lighter',
      fontSize: 11,
    },
  })
);

const ChipTooltip: FC<Props> = ({
  tag,
  className,
  onClick,
  onDelete,
  style,
}) => {
  const classes = useStyles();
  const divRef = useRef<any>();
  return (
    <>
      {tag && (
        <OverflowTooltip tooltip={tag.text} divRef={divRef}>
          <Chip
            label={
              <div
                className={[classes.chipText, className].join(' ')}
                ref={divRef}
              >
                {tag.text}
              </div>
            }
            size="small"
            variant="outlined"
            className={classes.chip}
            style={style}
            onClick={onClick}
            onDelete={onDelete}
          />
        </OverflowTooltip>
      )}
    </>
  );
};

export default ChipTooltip;
