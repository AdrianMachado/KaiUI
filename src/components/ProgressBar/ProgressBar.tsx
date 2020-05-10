import React from 'react';
import colors from '../../theme/colors.scss';
import { useFocus } from '../../hooks/useFocus';

import './ProgressBar.scss';

const prefixCls = 'kai-pbar';

interface LocalProps {
  header: string;
  type: "download" | "buffer";
  percentage: number;
  forwardedRef?: any;
  focusColor?: string;
  index?: number;
  onFocusChange?: (index: number) => void;
}

const ProgressBar = React.memo<LocalProps>(
  props => {
    const {
      header,
      type,
      percentage,
      focusColor,
      forwardedRef,
      index,
      onFocusChange
    } = props;

    const handleFocusChange = isNowFocused => {
      if (isNowFocused && onFocusChange) {
        onFocusChange(index || 0);
      }
    }

    const isFocused = useFocus(forwardedRef, handleFocusChange, false);
    
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
        tabIndex={0}
        className={prefixCls}
        style={{ backgroundColor: isFocused ? (focusColor || colors.defaultFocusColor) : colors.white }}
        ref={forwardedRef}
      >
        <span className={lineCls}>{header}</span>
        <div className={barWrapperCls}>
          <div
            className={leftFillerCls}
            style={{
              width: `${percentage}%`,
              backgroundColor: isFocused ? colors.grayscale20 : (focusColor || colors.defaultFocusColor),
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
);

export default React.forwardRef((props: LocalProps, ref) => (
  <ProgressBar forwardedRef={ref} {...props} />
));
