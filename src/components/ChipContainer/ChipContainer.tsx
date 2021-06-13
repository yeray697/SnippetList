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

interface Props {
  tagList: string[];
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
      '& > *': {
        margin: theme.spacing(0.5),
      },
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
      let currentFont = getFontFromRef(divRootRef);
      let hasFontChanged = fontChanged(currentFont);
      if (hasFontChanged) {
        for (let tag of tagList) {
          let width = getTextWidth(theme, tag, divRootRef, contextCanvan);
          width = Math.min(width, theme.chip.maxWidth);
          tagWidths.push(width);
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
      let tags: string[] = [];
      let remainingWidth = containerWidth;
      let i = 0;

      while (remainingWidth > 0 && i < tagList.length) {
        if (remainingWidth - tagWidths[i] >= 0) {
          tags.push(tagList[i]);
          remainingWidth -= tagWidths[i];
        }
        i++;
      }

      if (tags.length < tagList.length) {
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
        tags.push('+' + (tagList.length - tags.length));
      }
      return tags;
    };

    compareSize();
    window.addEventListener('resize', compareSize);
    return () => window.removeEventListener('resize', compareSize);
  }, [initialWidth, initialFont]);

  if (!tagList || tagList.length == 0) return null;

  return (
    <div ref={divRootRef} className={[classes.root, className].join(' ')}>
      {filteredTagsStatus &&
        filteredTagsStatus.map((tag, i) => {
          return <ChipTooltip tag={tag} key={tag} />;
        })}
    </div>
  );
};

export default ChipContainer;
