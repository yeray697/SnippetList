import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { FC, useRef } from 'react';
import ChipContainer from '../../Chips/ChipContainer';
import OverflowTooltip from '../../OverflowTooltip/OverflowTooltip';
import Tag from '../../../model/tag';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    section: {
      marginBottom: theme.spacing(1.5),
      '&:last-child': {
        marginBottom: 0,
      },
    },
    description: {
      fontWeight: 'lighter',
      overflow: 'hidden',
      fontSize: '0.85rem',
      wordBreak: 'break-word',
      display: '-webkit-box',
      '-webkit-line-clamp': 4,
      '-webkit-box-orient': 'vertical',
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
    chipContainer: {
      marginBottom: theme.spacing(0.375),
    },
  })
);

interface Props {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  className?: string;
}

const Content: FC<Props> = ({ id, title, description, tags, className }) => {
  const classes = useStyles();
  const titleDivRef = useRef<any>();
  return (
    <div className={[classes.root, className].join(' ')}>
      {' '}
      <motion.section
        className={classes.section}
        layoutId={`snippet-item-title-${id}`}
      >
        <OverflowTooltip tooltip={title} divRef={titleDivRef} placement="top">
          <div ref={titleDivRef} className={classes.title}>
            {title}
          </div>
        </OverflowTooltip>
      </motion.section>
      {description && (
        <motion.section
          className={classes.section}
          layoutId={`snippet-item-description-${id}`}
        >
          <Typography variant="body1" className={classes.description}>
            {description}
          </Typography>
        </motion.section>
      )}
      {tags && tags.length > 0 && (
        <motion.section
          className={classes.section}
          layoutId={`snippet-item-tags-${id}`}
        >
          <ChipContainer tagList={tags} className={classes.chipContainer} />
        </motion.section>
      )}
    </div>
  );
};

export default Content;
