import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ChipTooltip from './ChipTooltip';
import { useTheme } from '@material-ui/styles';
import Tag from '../../model/tag';

interface Props {
  tagList: Tag[];
  className?: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      maxHeight: theme.spacing(4),
      overflow: 'hidden',
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(-0.5),
      marginBottom: theme.spacing(-0.5),
    },
  })
);
const getRefWidth = (ref: React.RefObject<any>) => {
  return ref.current?.clientWidth ?? 0;
};

const getTextWidth = (
  theme: Theme,
  text: string,
  ref: React.RefObject<any>,
  context?: CanvasRenderingContext2D | null
): number => {
  if (!theme || !ref.current) return 0;
  if (!context) context = getContextCanvan();
  if (!context) return 0;
  context.font = getFontFromRef(ref);

  return context.measureText(text).width + theme.chip.margin;
};

const getFontFromRef = (ref: MutableRefObject<any>) => {
  const styles = getComputedStyle(ref.current?.children[0]);
  return styles.font;
};

const getContextCanvan = () => {
  const canvas = document.createElement('canvas');
  return canvas.getContext('2d');
};

const ChipContainer: FC<Props> = ({ tagList, className }) => {
  const [filteredTagsStatus, setFilteredTags] = useState(tagList);
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const divRootRef = useRef<any>();
  const tagWidths: number[] = [];
  const contextCanvan = getContextCanvan();

  let initialWidth = getRefWidth(divRootRef) ?? 0;
  let initialFont = '';
  useEffect(() => {
    const compareSize = () => {
      if (!divRootRef.current?.children[0]) return;
      let currentFont = getFontFromRef(divRootRef);
      let hasFontChanged = fontChanged(currentFont);
      if (hasFontChanged) {
        for (let tag of filteredTagsStatus) {
          if (tag) {
            let width = getTextWidth(
              theme,
              tag.text,
              divRootRef,
              contextCanvan
            );
            width = Math.min(width, theme.chip.maxWidth);
            tagWidths.push(width);
          }
        }
        initialFont = currentFont;
        hasFontChanged = true;
      }
      if (fontChanged || sizeExceedsVertically() || widthChanged()) {
        setFilteredTags(filterTags());
      }
      initialWidth = getRefWidth(divRootRef);
    };
    const widthChanged = () => {
      return initialWidth !== getRefWidth(divRootRef);
    };
    const fontChanged = (currentFont?: string) => {
      if (!currentFont) currentFont = getFontFromRef(divRootRef);
      return initialFont !== currentFont;
    };
    const sizeExceedsVertically = () => {
      return (
        divRootRef.current &&
        divRootRef.current.scrollHeight > divRootRef.current.clientHeight
      );
    };
    const filterTags = () => {
      let containerWidth = getRefWidth(divRootRef);
      let tags: Tag[] = [];
      let remainingWidth = containerWidth;
      let i = 0;

      while (remainingWidth > 0 && i < filteredTagsStatus.length) {
        if (remainingWidth - tagWidths[i] >= 0) {
          tags.push(filteredTagsStatus[i]);
          remainingWidth -= tagWidths[i];
        }
        i++;
      }

      if (tags.length < filteredTagsStatus.length) {
        let auxTextWidth = getTextWidth(
          theme,
          '+00',
          divRootRef,
          contextCanvan
        );
        while (remainingWidth <= auxTextWidth) {
          //If lower than that, remove the last element to make space
          remainingWidth += tagWidths[tags.length - 1];
          tags.splice(-1, 1);
        }
        tags.push({
          id: '-1',
          text: (filteredTagsStatus.length - tags.length).toString(),
        });
      }
      return tags;
    };

    compareSize();
    window.addEventListener('resize', compareSize);
    return () => window.removeEventListener('resize', compareSize);
  }, [initialWidth, initialFont]);

  if (!filteredTagsStatus || filteredTagsStatus.length === 0) return null;

  return (
    <div ref={divRootRef} className={[classes.root, className].join(' ')}>
      {filteredTagsStatus &&
        filteredTagsStatus.map((tag, i) => {
          return <ChipTooltip tag={tag} key={i} />;
        })}
    </div>
  );
};

export default ChipContainer;
