import { useRef, useState, useEffect, FC, ReactElement } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
type Props = {
  tooltip?: string;
  divRef?: React.MutableRefObject<any>;
  children: ReactElement<any, any>;
  noRef?: boolean;
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
  noRef,
  className,
  children,
  placement,
}) => {
  let newRef: React.MutableRefObject<any>;
  //ToDo if (!noRef) newRef = useRef<any>();

  const [hoverStatus, setHover] = useState(false);
  const compareSize = () => {
    const compare =
      !hoverStatus &&
      (divRef ?? newRef)?.current?.scrollWidth >
        (divRef ?? newRef)?.current?.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener('resize', compareSize);
    },
    []
  );
  const test = () => {
    return noRef ? <div ref={newRef}> {children} </div> : children;
  };
  if (!placement) placement = 'right';
  return (
    <>
      {tooltip && (
        <Tooltip
          title={tooltip}
          interactive
          TransitionComponent={Zoom}
          disableHoverListener={!hoverStatus} // {false} //
          arrow
          children={test()}
          placement={placement}
          className={className}
        />
      )}
    </>
  );
};

export default OverflowTooltip;
