import React from 'react';
import {useFocus} from '../../hooks/useFocus';
import './TextListItem.scss';
import classNames from 'classnames';

const prefixCls = 'kai-tl';

interface LocalProps {
  primary: string;
  secondary?:string;
  tertiary?: string;
  focusClass?: string;
  forwardedRef?:any;
  index?:number;
  onFocusChange?: (index: number) => void;
  className?: string;
}

const TextListItem = React.memo<LocalProps>(
  props => {
    const {
      primary,
      secondary,
      tertiary,
      focusClass,
      forwardedRef,
      index,
      onFocusChange,
      className
    } = props;

    const handleFocusChange = isNowFocused => {
      if (isNowFocused) {
        onFocusChange(index);
      }
    }
    
    const isFocused = useFocus(forwardedRef, handleFocusChange, false);

    const itemCls = prefixCls;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const tertiaryCls = `${prefixCls}-tertiary ${tertiary ? '' : 'hidden'}`;
    const focusedCls = isFocused ? `${prefixCls}-focused ${(focusClass||'defaultFocusCls')}` : '';
    return (
      <div
        tabIndex={0}
        className={classNames(itemCls, (className || ''), focusedCls)}
        ref={forwardedRef}
      >
        <span className={classNames(primaryCls, (className || ''))}>{primary}</span>
        <label className={secondaryCls}>{secondary}</label>
        <label className={tertiaryCls}>{tertiary}</label>
      </div>
    );
  }
);

export default React.forwardRef((props:LocalProps, ref:any) => (
  <TextListItem forwardedRef={ref} {...props} />
));
