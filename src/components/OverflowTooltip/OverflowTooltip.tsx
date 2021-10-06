import { useState, useEffect, FC, ReactElement } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import useRect from '../../hooks/useRect';

type Props = {
  tooltip?: string;
  divRef: React.MutableRefObject<any>;
  children: ReactElement<any, any>;
  className?: string;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
};
const OverflowTooltip: FC<Props> = ({
  tooltip,
  divRef,
  className,
  children,
  placement,
}) => {
  const [hoverStatus, setHover] = useState(false);
  const rect = useRect(divRef);

  useEffect(() => {
    const compare = rect.scrollWidth > rect.clientWidth;
    setHover(compare);
  }, [rect]);
  if (!placement) placement = 'right';
  return (
    <>
      {tooltip && (
        <Tooltip
          title={tooltip}
          interactive
          TransitionComponent={Zoom}
          disableHoverListener={!hoverStatus}
          arrow
          children={children}
          placement={placement}
          className={className}
        />
      )}
    </>
  );
};

export default OverflowTooltip;
