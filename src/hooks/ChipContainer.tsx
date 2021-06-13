// import React, {
//   FC,
//   MutableRefObject,
//   RefObject,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core';
// import ChipTooltip from './ChipTooltip';
// import useRect from 'useRect';
// import { useTheme } from '@material-ui/styles';
// import { debounce } from 'lodash';
// import clsx from 'clsx';

// interface Props {
//   tags: string[];
//   className?: string;
// }

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       maxHeight: theme.spacing(4),
//       overflow: 'hidden',
//       marginLeft: theme.spacing(-0.5),
//       marginRight: theme.spacing(-0.5),
//       marginBottom: theme.spacing(-0.5),
//       '& > *': {
//         margin: theme.spacing(0.5),
//       },
//     },
//   })
// );

// const canvas = document.createElement('canvas');
// const canvasContext = canvas.getContext('2d');

// const getTextWidth = (
//   text: string,
//   ref: RefObject<any>,
//   margin: number
// ): number => {
//   if (!ref.current || !canvasContext) return 0;
//   canvasContext.font = getComputedStyle(ref.current?.children[0]).font;
//   return canvasContext.measureText(text).width + margin;
// };

// const ChipContainer: FC<Props> = ({ tags, className }) => {
//   const classes = useStyles();
//   const theme = useTheme<Theme>();
//   const [rootNode, setRootNode] = useState();
//   const [rootRect, setRootRect] = useState<DOMRect>();
//   const [filteredTags, setFilteredTags] = useState(tags);

//   const rootRef = useCallback((node: HTMLDivElement) => {
//     setRootNode(node);
//     setRootRect(node?.getBoundingClientRect());
//   }, []);

//   useEffect(() => {
//     let lastWidth = rootRect?.width ?? 0;

//     const compareSize = () => {
//       const widthChanged = lastWidth !== rootRect?.width ?? 0;
//       const sizeExceedsVertically = rootNode?.scrollHeight > rootRect?.height;
//       if (sizeExceedsVertically || widthChanged) setFilteredTags(filterTags());
//       lastWidth = rootRect?.width ?? 0;
//     };

//     const filterTags = () => {
//       let remainingWidth = lastWidth;
//       const filtered: string[] = [];
//       const tagWidths = tags.map(tag =>
//         Math.min(
//           getTextWidth(tag, rootRef, theme.chip.margin),
//           theme.chip.maxWidth
//         )
//       );

//       for (let i = 0; remainingWidth > 0 && i < tags.length; i++) {
//         if (remainingWidth - tagWidths[i] >= 0) {
//           filtered.push(tags[i]);
//           remainingWidth -= tagWidths[i];
//         }
//       }

//       if (filtered.length < tags.length) {
//         let auxTextWidth = getTextWidth('+XX', rootRef, theme.chip.margin);
//         while (remainingWidth <= auxTextWidth) {
//           // If lower than that, remove the last element to make space
//           remainingWidth += tagWidths[filtered.length - 1];
//           filtered.splice(-1, 1);
//         }
//         filtered.push('+' + (tags.length - filtered.length));
//       }

//       return filtered;
//     };

//     const compareSizeDebounced = debounce(compareSize, 50);
//     window.addEventListener('resize', compareSizeDebounced);
//     window.addEventListener('load', compareSize);
//     return () => {
//       compareSizeDebounced.cancel();
//       window.removeEventListener('resize', compareSizeDebounced);
//       window.removeEventListener('load', compareSize);
//     };
//   }, [tags, rootRect, filteredTags, theme]);

//   if (!tags?.length) return null;

//   return (
//     <div ref={rootRef} className={clsx(classes.root, className)}>
//       {filteredTags?.map((tag, i) => (
//         <ChipTooltip tag={tag} key={tag} />
//       ))}
//     </div>
//   );
// };

// export default ChipContainer;

export default {};
