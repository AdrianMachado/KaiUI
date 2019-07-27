import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './IconListItem.scss';

const prefixCls = 'kai-il';

const IconListItem = React.memo(
  props => {
    const {
      primary,
      secondary,
      icon,
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
        ref={forwardedRef}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        <div className={iconCls}>
          <span className={icon} />
        </div>
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
      </div>
    );
  }
);

IconListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  icon: PropTypes.string.isRequired,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

IconListItem.defaultProps = {
  secondary: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <IconListItem forwardedRef={ref} {...props} />
));
