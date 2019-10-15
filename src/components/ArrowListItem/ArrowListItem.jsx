import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './ArrowListItem.scss';

const prefixCls = 'kai-al';

const ArrowListItem = React.memo(
  React.forwardRef((props, ref) => {
    const {
      primary,
      secondary,
      focusColor,
      index,
      onFocusChange
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

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
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
        <div className={iconCls}>
          <span className="kai-icon-arrow" />
        </div>
      </div>
    );
  }
));

ArrowListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  focusColor: PropTypes.string,
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

ArrowListItem.defaultProps = {
  secondary: null,
  focusColor: colors.defaultFocusColor,
};

export default ArrowListItem;
