import React from 'react';
import { useFocus } from '../../hooks/useFocus';
import colors from '../../theme/colors.scss';

import './BodyTextListItem.scss';

const prefixCls = 'kai-btl';

interface LocalProps {
  header: string;
  body?: string;
  focusColor?:string;
  forwardedRef?:any;
  index?: number;
  onFocusChange?: (index: number) => void;
}

const BodyTextListItem = React.memo<LocalProps>(
  props => {
    const {
      header,
      body,
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
    const headerCls = `${prefixCls}-header`;
    const bodyCls = `${prefixCls}-body ${body ? '' : 'hidden'}`;

    return (
      <div
        tabIndex={0}
        className={itemCls}
        style={{ backgroundColor: isFocused ? (focusColor || colors.defaultFocusColor) : colors.white }}
        ref={forwardedRef}
      >
        <span className={headerCls}>{header}</span>
        <label className={bodyCls}>{body}</label>
      </div>
    );
  }
);
export default React.forwardRef((props:LocalProps, ref) => (
  <BodyTextListItem forwardedRef={ref} {...props} />
));
