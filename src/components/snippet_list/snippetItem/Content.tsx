import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { FC, useRef } from 'react';
import ChipContainer from '../../Chips/ChipContainer';
import OverflowTooltip from '../../OverflowTooltip/overflow_tooltip';
import Tag from '../../../model/tag';

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
  title: string;
  description: string;
  tags: Tag[];
  className?: string;
}

const Content: FC<Props> = ({ title, description, tags, className }) => {
  const classes = useStyles();
  const titleDivRef = useRef<any>();
  return (
    <section className={[classes.root, className].join(' ')}>
      {' '}
      <section className={classes.section}>
        <OverflowTooltip tooltip={title} divRef={titleDivRef} placement="top">
          <div ref={titleDivRef} className={classes.title}>
            {title}
          </div>
        </OverflowTooltip>
      </section>
      {description && (
        <section className={classes.section}>
          <Typography variant="body1" className={classes.description}>
            {description}
          </Typography>
        </section>
      )}
      {tags && tags.length > 0 && (
        <section className={classes.section}>
          <ChipContainer tagList={tags} className={classes.chipContainer} />
        </section>
      )}
    </section>
  );
};

export default Content;
