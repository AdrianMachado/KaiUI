import React from 'react';
import { useFocus } from '../../hooks/useFocus';
import colors from '../../theme/colors.scss';

import './ArrowListItem.scss';

const prefixCls = 'kai-al';

interface LocalProps {
  primary: string;
  secondary?: string;
  focusColor?: string;
  forwardedRef?: any;
  index?: number;
  onFocusChange?: (index: number) => void;
}

const ArrowListItem = React.memo<LocalProps>(
  props => {
    const {
      primary,
      secondary,
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

    return (
      <div
        tabIndex={0}
        className={itemCls}
        style={{ backgroundColor: isFocused ? (focusColor || colors.defaultFocusColor) : colors.white }}
        ref={forwardedRef}
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
export default React.forwardRef((props: LocalProps, ref) => (
  <ArrowListItem forwardedRef={ref} {...props} />
));
