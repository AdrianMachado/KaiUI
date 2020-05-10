import React, { useCallback } from 'react';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import { useFocus } from '../../hooks/useFocus';
import './IconButton.scss';
import classNames from 'classnames';
import { SoftKeyContextProps } from '../SoftKey/SoftKeyProvider';

const prefixCls = 'kai-icon-button';

interface LocalProps{
  text?: string,
  icon?: any,
  iconSrc?: string,
  softKeyIcon?:any,
  softKeyManager?: SoftKeyContextProps,
  iconSide?: "left" | "right",
  onClick?: () => void,
  focusColor?: string,
  form?: string,
  formAction?: string,
  formEncType?: string,
  formMethod?: string,
  formNoValidate?:boolean,
  formTarget?: string,
  name?:string,
  type?: "button" | "submit" | "reset",
  onFocusChange?: (index: number) => void,
  index?: number,
  forwardedRef?: any
  className?: string;
  id?:string;
  focusClass?: string;
}

const IconButton = React.memo<LocalProps>(props => {
  const {
    id,
    icon,
    onClick,
    focusClass,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    name,
    type,
    onFocusChange,
    index,
    forwardedRef,
    className
  } = props;

  const handleFocusChange = useCallback(
    isNowFocused => {
      if (isNowFocused) {
        onFocusChange(index);
      }
    },
    [index, onFocusChange, onClick]
  );

  const isFocused = useFocus(forwardedRef, handleFocusChange, false);

  const buttonCls = prefixCls;
  const inputCls = `${prefixCls}-input`;
  const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
  const focusedCls = isFocused ? `${prefixCls}-focused ${(focusClass||'')}` : '';

  const iconComp = (
    <div className={iconCls}>
      {icon}
    </div>
  );

  const handleClick = () => {
    if(onClick)
      onClick();
  };

  return (
    <span className={classNames(buttonCls, (className||''))}>
      <button
        id={id}
        tabIndex={0}
        className={classNames(inputCls, focusedCls)}
        form={form}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formNoValidate={formNoValidate}
        formTarget={formTarget}
        name={name}
        type={type}
        ref={forwardedRef}
        onClick={handleClick}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        {iconComp}
      </button>
    </span>
  );
});

export default React.forwardRef((props:LocalProps, ref) => (
  <SoftKeyConsumer>
    {context => (
      <IconButton softKeyManager={context} forwardedRef={ref} {...props} />
    )}
  </SoftKeyConsumer>
));
