import React from 'react';
import classNames from 'classnames';
import { useFocus } from '../../hooks/useFocus';

import './IconListItem.scss';

const prefixCls = 'kai-il';

interface LocalProps {
  id?:string;
  primary:string,
  secondary?: string,
  icon?:any,
  iconSrc?: string,
  focusClass?: string,
  forwardedRef?: any,
  index?: number,
  onFocusChange?: (index: number) => void,
  linkTo?: string, 
  iconWidth?: string,
  disabled?: boolean,
  className?: string,
  onClick?: () => void
}

const IconListItem = React.memo<LocalProps>(
  props => {
    const {
      id,
      primary,
      secondary,
      icon,
      iconSrc,
      focusClass,
      forwardedRef,
      index,
      onFocusChange,
      linkTo, 
      iconWidth,
      disabled,
      className,
      onClick
    } = props;

    const handleFocusChange = isNowFocused => {
      if (isNowFocused) {
        onFocusChange(index);
      }
    }

    const isFocused = useFocus(forwardedRef, handleFocusChange, false) && !disabled;

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

    const disabledCls = disabled ? `${prefixCls}-disabled`: "";

    const focusedCls = isFocused ? `${prefixCls}-focused ${(focusClass||'')}` : '';

    let renderedIcon: any | undefined;
    if(iconSrc) {
      renderedIcon = <img src={iconSrc} alt="" width={iconWidth || 50} />
    }
    else if(React.isValidElement(icon)) {
      renderedIcon = <span>{icon}</span>;
    }
    else {
      renderedIcon = <span className={icon} style={{width: iconWidth}} />;
    }
  
    const handleClick = () => {
      if(onClick) {
        onClick();
      }
      else if(linkTo) {
        window.location.href = linkTo;
      }
    };

    return (
      <div
        tabIndex={!disabled ? index : undefined}
        className={classNames(itemCls, disabledCls, (className || ''), focusedCls)}
        ref={forwardedRef}
        onClick={handleClick}
      >
        <div className={iconCls}>
          {renderedIcon}
        </div>
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
      </div>
    );
  }
);

export default React.forwardRef((props:LocalProps, ref) => (
  <IconListItem forwardedRef={ref} {...props} />
));
