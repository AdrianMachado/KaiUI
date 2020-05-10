import React from 'react';
import colors from '../../theme/colors.scss';
import './Tab.scss';

const prefixCls = 'kai-tab';

const Tab = React.memo<any>(
  props => {
    const {
      index,
      label,
      onTabChange,
      isActive,
      focusColor,
      forwardedRef
    } = props;

    const actPrefixCls = `${prefixCls}${isActive ? '-active' : '-inactive'}`;

    const handleClick = () => onTabChange(index);
    const style = { '--tab-underline-color': (focusColor || colors.defaultFocusColor) } as React.CSSProperties;
    return (
      <div
        onClick={handleClick}
        className={actPrefixCls}
        style={style}
        ref={forwardedRef}
      >
        <div className={`${actPrefixCls}-label`}>{label}</div>
      </div>
    );
  }
);

export default React.forwardRef((props:any, ref:any) => (
  <Tab forwardedRef={ref} {...props} />
));
