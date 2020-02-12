import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import './SoftKey.scss';

const prefixCls = 'kai-softkey';

const Button = props => {
  const { handleClick, icon, text } = props;

  const handleButtonClick = e => {
    e.preventDefault();
    handleClick();
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

  return (
    <button
      className={`${prefixCls}-btn`}
      onClick={handleButtonClick}
      onFocus={handleCheckFocus}
    >
      <span className={icon} />
      {text}
    </button>
  );
};

const SoftKey = React.memo(props => {
  const {
    leftCallback,
    rightCallback,
    centerCallback,
    leftText,
    rightText,
    centerText,
    centerIcon,
  } = props;

  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'SoftLeft':
          leftCallback();
          break;
        case 'SoftRight':
          rightCallback();
          break;
        case 'Enter':
          // Action case press center key
          centerCallback();
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
      <Button pos="left" text={leftText} handleClick={leftCallback} />
      <Button
        pos="center"
        text={centerText}
        icon={centerIcon}
        handleClick={centerCallback}
      />
      <Button pos="right" text={rightText} handleClick={rightCallback} />
    </div>
  );
});

SoftKey.propTypes = {
  leftText: PropTypes.string,
  centerText: PropTypes.string,
  rightText: PropTypes.string,
  centerIcon: PropTypes.string,
  leftCallback: PropTypes.func,
  centerCallback: PropTypes.func,
  rightCallback: PropTypes.func,
};

SoftKey.defaultProps = {
  leftText: '',
  centerText: '',
  rightText: '',
  centerIcon: null,
  leftCallback: () => {},
  centerCallback: () => {},
  rightCallback: () => {},
};

export default SoftKey;
