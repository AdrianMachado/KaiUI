import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './ProgressBar.scss';

const prefixCls = 'kai-pbar';

const ProgressBar = React.memo(
  React.forwardRef((props, ref) => {
    const {
      header,
      type,
      percentage,
      focusColor,
      index,
      onFocusChange
    } = props;

    const [isFocused, setFocused] = useState(false);
    
    const lineCls = `${prefixCls}-line`;
    const barWrapperCls = `${prefixCls}-bar-wrapper`;
    const leftFillerCls = `${prefixCls}-left-filler-${
      isFocused ? 'focused' : 'unfocused'
    }`;
    const rightFillerCls = `${prefixCls}-right-filler-${type}-${
      isFocused ? 'focused' : 'unfocused'
    }`;

    const handleFocusChange = isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        onFocusChange(index);
      }
    }

    return (
      <div
        tabIndex="0"
        className={prefixCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={ref}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
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
));

ProgressBar.propTypes = {
  header: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['download', 'buffer']).isRequired,
  percentage: PropTypes.number.isRequired,
  focusColor: PropTypes.string,
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

ProgressBar.defaultProps = {
  focusColor: colors.defaultFocusColor,
};

export default ProgressBar;
