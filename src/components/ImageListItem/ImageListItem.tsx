import React from 'react';
import { useFocus } from '../../hooks/useFocus';
import classNames from 'classnames';

import './ImageListItem.scss';

const prefixCls = 'kai-il-img';

const ImageListItem = React.memo<any>(
  props => {
    const {
      id,
      primary,
      secondary,
      icon,
      iconSrc,
      selectedClass,
      isSelected,
      focusClass,
      forwardedRef,
      index,
      onFocusChange,
      linkTo, 
      iconWidth,
      className,
      counter
    } = props;

    const handleFocusChange = isNowFocused => {
      if (isNowFocused) {
        onFocusChange(index);
      }
    }
    
    const handleClick = () => {
      if(linkTo) {
        window.location.href = linkTo;
      }
    };
 
    const isFocused = useFocus(forwardedRef, handleFocusChange, false);

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const counterCls = `counter`;

    const focusedCls = isFocused ? `${prefixCls}-focused ${(focusClass||'')}` : '';
    const selectedCls = isSelected ? `${prefixCls}-selected ${(selectedClass||'')}` : '';
    const renderedIcon = !iconSrc ?
        <span className={icon} /> :
        <img src={iconSrc} alt="" width={iconWidth || 50} height="100%" />;

    return (
      <div
        tabIndex={index}
        className={classNames(itemCls, (className || ''), focusedCls, selectedCls)}
        ref={forwardedRef}
        onClick={handleClick}
      >
        <div className={lineCls}>
          <span className={primaryCls}>
            {counter ? <span className={counterCls}>{counter}</span> : null}
            {primary}
          </span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
        <div className={iconCls}>
          {renderedIcon}
        </div>
      </div>
    );
  }
);

export default React.forwardRef((props:any, ref) => (
  <ImageListItem forwardedRef={ref} {...props} />
));
