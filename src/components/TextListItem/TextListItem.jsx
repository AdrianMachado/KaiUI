import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { useFocus } from '../../hooks';

import './TextListItem.scss';

const prefixCls = 'kai-tl';

const TextListItem = React.memo(
  props => {
    const {
      primary,
      secondary,
      tertiary,
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
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const tertiaryCls = `${prefixCls}-tertiary ${tertiary ? '' : 'hidden'}`;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={forwardedRef}
      >
        <span className={primaryCls}>{primary}</span>
        <label className={secondaryCls}>{secondary}</label>
        <label className={tertiaryCls}>{tertiary}</label>
      </div>
    );
  }
);

TextListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

TextListItem.defaultProps = {
  secondary: null,
  tertiary: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <TextListItem forwardedRef={ref} {...props} />
));
