import React, { useCallback, useEffect } from 'react';

import './SoftKey.scss';

const prefixCls = 'kai-softkey';

const Button = props => {
  const { handleClick, icon, text, id } = props;

  const handleButtonClick = e => {
    e.preventDefault();
    if(handleClick) {
      handleClick();
    }
  };

  // We want to avoid losing focus on the parent element
  const handleCheckFocus = e => {
    e.preventDefault();
    if (e.relatedTarget) {
      // Revert focus back to previous blurring element
      e.relatedTarget.focus();
    } else {
      // No previous focus target, blur instead
      e.currentTarget.blur();
    }
  };

  let renderedIcon:any|undefined;
  if(icon){
    if(React.isValidElement(icon)) {
      renderedIcon = icon;
    }
    else if(icon.toString().indexOf("kai-") === -1) {
      renderedIcon = <img src={icon} width={20} height={20}/>
    }
    else {
      renderedIcon = <span className={icon} />;
    }
  }

  return (
    <button
      id={id}
      className={`${prefixCls}-btn`}
      onClick={handleButtonClick}
      onFocus={handleCheckFocus}
      data-icon={renderedIcon ? "true" : undefined}
    >
      {renderedIcon}
      {text}
    </button>
  );
};

interface SoftKeyProps {
  leftText?: string | null,
  centerText?: string | null,
  rightText?: string | null,
  centerIcon?: any | null,
  leftIcon?: any | null,
  rightIcon?: any | null,
  leftCallback?: () => void,
  centerCallback?: () => void,
  rightCallback?: () => void,
}

const SoftKey = React.memo<SoftKeyProps>(props => {
  const {
    leftCallback,
    rightCallback,
    centerCallback,
    leftText,
    rightText,
    centerText,
    leftIcon,
    centerIcon,
    rightIcon,
  } = props;

  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'SoftLeft':
          if(leftCallback) {
            leftCallback();
          }
          break;
        case 'SoftRight':
          if(rightCallback) {
            rightCallback();
          }
          break;
        case 'Enter':
          // Action case press center key
          if(centerCallback) {
            centerCallback();
          }
          break;
        default:
          break;
      }
    },
    [leftCallback, rightCallback, centerCallback]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={`${prefixCls} visible`}>
      <Button 
        id="leftSoftKey"
        pos="left" 
        text={leftText} 
        icon={leftIcon} 
        handleClick={leftCallback} />
      <Button
        id="centerSoftKey"
        pos="center"
        text={centerText}
        icon={centerIcon}
        handleClick={centerCallback}
      />
      <Button 
        id="rightSoftKey"
        pos="right" 
        text={rightText} 
        icon={rightIcon} 
        handleClick={rightCallback} />
    </div>
  );
});

export default SoftKey;
