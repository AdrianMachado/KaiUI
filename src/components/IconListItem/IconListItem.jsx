import React from 'react';
import PropTypes from 'prop-types';
import { requireOneOf } from '../../utils';
import { useFocus } from '../../hooks';
import colors from '../../theme/colors.scss';

import './IconListItem.scss';

const prefixCls = 'kai-il';

const IconListItem = React.memo(
  props => {
    const {
      primary,
      secondary,
      icon,
      iconSrc,
      focusColor,
      forwardedRef,
      index,
      onFocusChange
    } = props;

    const handleFocusChange = isNowFocused => {
      if (isNowFocused) {
        onFocusChange(index);
      }
    }

    const isFocused = useFocus(forwardedRef, handleFocusChange, false);

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

    const renderedIcon = iconSrc === null ?
        <span className={icon} /> :
        <img src={iconSrc} alt="" />;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        ref={forwardedRef}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
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
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

IconListItem.defaultProps = {
  secondary: null,
  icon: null,
  iconSrc: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <IconListItem forwardedRef={ref} {...props} />
));
