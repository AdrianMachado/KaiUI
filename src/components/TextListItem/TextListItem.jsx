import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './TextListItem.scss';

const prefixCls = 'kai-tl';

const TextListItem = React.memo(
  React.forwardRef((props, ref) => {
    const {
      primary,
      secondary,
      tertiary,
      focusColor,
      index,
      onFocusChange
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const tertiaryCls = `${prefixCls}-tertiary ${tertiary ? '' : 'hidden'}`;

    const handleFocusChange = isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        onFocusChange(index);
      }
    }

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={ref}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        <span className={primaryCls}>{primary}</span>
        <label className={secondaryCls}>{secondary}</label>
        <label className={tertiaryCls}>{tertiary}</label>
      </div>
    );
  }
));

TextListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  focusColor: PropTypes.string,
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

TextListItem.defaultProps = {
  secondary: null,
  tertiary: null,
  focusColor: colors.defaultFocusColor,
};

export default TextListItem;
