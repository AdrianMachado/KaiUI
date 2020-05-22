import React from 'react';
import { useFocus } from '../../hooks/useFocus';

import './ArrowListItem.scss';
import classNames from 'classnames';
import { SoftKeyConsumer, SoftKeyManagerProps } from '../SoftKey/withSoftKeyManager';

const prefixCls = 'kai-al';

interface LocalProps {
  primary: string;
  secondary?: string;
  focusClass?: string;
  forwardedRef?: any;
  index?: number;
  onFocusChange?: (index: number) => void;
  onClick?:() => void;
}
type Props = LocalProps 
  & SoftKeyManagerProps;

const ArrowListItem = React.memo<Props>(
  props => {
    const {
      primary,
      secondary,
      focusClass,
      forwardedRef,
      index,
      onFocusChange,
      onClick,
      softKeyManager
    } = props;

    const handleFocusChange = isNowFocused => {
      if (isNowFocused) {
        if(onFocusChange)
          onFocusChange(index);
        if(onClick)
          softKeyManager.setCenterCallback(onClick);
      }
    }

    const isFocused = useFocus(forwardedRef, handleFocusChange, false);

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    
    const focusedCls = isFocused ? `${prefixCls}-focused ${(focusClass||'defaultFocusCls')}` : '';

    return (
      <div
        tabIndex={0}
        className={classNames(itemCls, focusedCls)}
        ref={forwardedRef}
        onClick={onClick}
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
  <SoftKeyConsumer>
    {context => (
      <ArrowListItem
        softKeyManager={context}
        forwardedRef={ref}
        {...props}
      />
    )}
  </SoftKeyConsumer>
));
