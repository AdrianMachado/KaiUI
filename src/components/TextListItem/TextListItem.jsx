import React from 'react';
import PropTypes from 'prop-types';
import './TextListItem.scss';

const prefixCls = 'kai-tl';

class TextListItem extends React.Component {
  render() {
    const {
      primary,
      secondary,
      tertiary,
      forwardedRef,
      index,
      onFocusChange,
    } = this.props;

    const itemCls = prefixCls;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const tertiaryCls = `${prefixCls}-tertiary ${tertiary ? '' : 'hidden'}`;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        ref={forwardedRef}
        onFocus={() => onFocusChange(index)}
      >
        <span className={primaryCls}>{primary}</span>
        <label className={secondaryCls}>{secondary}</label>
        <label className={tertiaryCls}>{tertiary}</label>
      </div>
    );
  }
}

TextListItem.defaultProps = {
  secondary: null,
  tertiary: null,
};

TextListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  forwardedRed: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

export default React.forwardRef((props, ref) => (
  <TextListItem forwardedRef={ref} {...props} />
));
