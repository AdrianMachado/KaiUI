import React from 'react';
import PropTypes from 'prop-types';
import './ArrowListItem.scss';

const prefixCls = 'kai-al';

class ArrowListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  handleFocusChange(isFocused) {
    this.setState({ isFocused });
    if (isFocused) {
      this.props.onFocusChange(this.props.index);
    }
  }

  render() {
    const { primary, secondary, forwardedRef } = this.props;
    const { isFocused } = this.state;

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        ref={forwardedRef}
        onFocus={() => this.handleFocusChange(true)}
        onBlur={() => this.handleFocusChange(false)}
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
}

ArrowListItem.defaultProps = {
  secondary: null,
};

ArrowListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

export default React.forwardRef((props, ref) => (
  <ArrowListItem forwardedRef={ref} {...props} />
));
