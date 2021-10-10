import { FC, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ChipTooltip from './ChipTooltip';
import { useTheme } from '@material-ui/styles';
import Tag from '../../model/tag';
import useOverflowWidthList from '../../hooks/useOverflowWidthList';

interface Props {
  tagList: Tag[];
  className?: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      maxHeight: theme.spacing(3),
      overflow: 'hidden',
    },
  })
);

const ChipContainer: FC<Props> = ({ tagList, className }) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const divRootRef = useRef<any>();
  const filteredList = useOverflowWidthList(divRootRef, tagList, theme);

  return (
    <div ref={divRootRef} className={[classes.root, className].join(' ')}>
      {filteredList &&
        filteredList.map((tag, i) => {
          return <ChipTooltip tag={tag} key={tag.text} className={'test'} />;
        })}
      {tagList.length !== filteredList.length && (
        <ChipTooltip
          tag={
            {
              id: '0',
              text: '+' + (tagList.length - filteredList.length),
            } as Tag
          }
          key="overflowChip"
        />
      )}
    </div>
  );
};

export default ChipContainer;
