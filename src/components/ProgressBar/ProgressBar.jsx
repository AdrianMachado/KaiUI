import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './ProgressBar.scss';

const prefixCls = 'kai-pbar';

class ProgressBar extends React.PureComponent {
  constructor() {
    super();
    this.state = { isFocused: false };
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  handleFocusChange(isFocused) {
    this.setState({ isFocused });
    if (isFocused) {
      this.props.onFocusChange(this.props.index);
    }
  }

  render() {
    const { header, percentage, type, focusColor, forwardedRef } = this.props;
    const { isFocused } = this.state;
    const lineCls = `${prefixCls}-line`;
    const barWrapperCls = `${prefixCls}-bar-wrapper`;
    const leftFillerCls = `${prefixCls}-left-filler-${
      isFocused ? 'focused' : 'unfocused'
    }`;
    const rightFillerCls = `${prefixCls}-right-filler-${type}-${
      isFocused ? 'focused' : 'unfocused'
    }`;

    return (
      <div
        tabIndex="0"
        className={prefixCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={forwardedRef}
        onFocus={() => this.handleFocusChange(true)}
        onBlur={() => this.handleFocusChange(false)}
      >
        <span className={lineCls}>{header}</span>
        <div className={barWrapperCls}>
          <div
            className={leftFillerCls}
            style={{
              width: `${percentage}%`,
              backgroundColor: isFocused ? colors.grayscale20 : focusColor,
            }}
          />
          <div
            className={rightFillerCls}
            style={{ width: `${100 - percentage}%` }}
          />
        </div>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  focusColor: colors.defaultFocusColor,
};

ProgressBar.propTypes = {
  header: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['download', 'buffer']).isRequired,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

export default React.forwardRef((props, ref) => (
  <ProgressBar forwardedRef={ref} {...props} />
));