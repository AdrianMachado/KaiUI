import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { requireOneOf } from '../../utils'
import colors from '../../theme/colors.scss';

import './IconListItem.scss';

const prefixCls = 'kai-il';

const IconListItem = React.memo(
  React.forwardRef((props, ref) => {
    const {
      primary,
      secondary,
      icon,
      iconSrc,
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

    const renderedIcon = iconSrc === null ?
        <span className={icon} /> :
        <img src={iconSrc} alt="" />;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        ref={ref}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
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
));

const requireOneIcon = requireOneOf({
  icon: PropTypes.string,
  iconSrc: PropTypes.string
});

IconListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  icon: requireOneIcon,
  iconSrc: requireOneIcon,
  focusColor: PropTypes.string,
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

IconListItem.defaultProps = {
  secondary: null,
  icon: null,
  iconSrc: null,
  focusColor: colors.defaultFocusColor,
};

export default IconListItem;
