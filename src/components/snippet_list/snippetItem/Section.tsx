import { Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { FC } from 'react';

interface Props {
  showDivider?: boolean;
  title?: string;
  className?: string;
  dividerProps?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      textTransform: 'uppercase',
      fontWeight: 'lighter',
      marginBottom: theme.spacing(0.5),
    },
    divider: {
      marginBottom: theme.spacing(1),
    },
  })
);

const Section: FC<Props> = ({
  children,
  title,
  showDivider,
  className,
  dividerProps,
}) => {
  const classes = useStyles();
  return (
    <div className={className}>
      {showDivider && (
        // <Divider className={[classes.divider, dividerProps].join(' ')} />
        <div className={[classes.divider, dividerProps].join(' ')} />
      )}
      <div className={classes.root}>
        {title && title.length && (
          <Typography variant="body2" component="p" className={classes.title}>
            {title}
          </Typography>
        )}
        {children}
      </div>
    </div>
  );
};

export default Section;
