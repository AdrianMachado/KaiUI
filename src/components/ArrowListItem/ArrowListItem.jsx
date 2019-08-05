import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './ArrowListItem.scss';

const prefixCls = 'kai-al';

const ArrowListItem = React.memo(
  props => {
    const {
      primary,
      secondary,
      focusColor,
      forwardedRef,
      index,
      onFocusChange
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

    const handleFocusChange = newFocused => {
      setFocused(newFocused);
      if (newFocused) {
        onFocusChange(index);
      }
    }

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={forwardedRef}
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
);

ArrowListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

ArrowListItem.defaultProps = {
  secondary: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <ArrowListItem forwardedRef={ref} {...props} />
));
