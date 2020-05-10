import React from 'react';
import {useFocus} from '../../hooks/useFocus';
import './TextListItem.scss';
import classNames from 'classnames';

const prefixCls = 'kai-tl';

const TextListItem = React.memo<any>(
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

    let isFocused = false;
    if(index){
      const handleFocusChange = isNowFocused => {
        if (isNowFocused) {
          onFocusChange(index);
        }
      }
      isFocused = useFocus(forwardedRef, handleFocusChange, false);
    }

    const itemCls = prefixCls;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const tertiaryCls = `${prefixCls}-tertiary ${tertiary ? '' : 'hidden'}`;
    const focusedCls = isFocused ? `${prefixCls}-focused ${(focusClass||'')}` : '';
    return (
      <div
        tabIndex={index || undefined}
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

export default React.forwardRef((props:any, ref:any) => (
  <TextListItem forwardedRef={ref} {...props} />
));
