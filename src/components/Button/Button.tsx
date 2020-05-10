import React, { useCallback } from 'react';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import { useFocus } from '../../hooks/useFocus';
import './Button.scss';
import { SoftKeyContextProps } from '../SoftKey/SoftKeyProvider';

const prefixCls = 'kai-button';

interface LocalProps{
  text: string,
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
}
const Button = React.memo<LocalProps>(props => {
  const {
    text,
    icon,
    iconSrc,
    iconSide,
    onClick,
    focusColor,
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
    forwardedRef
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
  const lineCls = `${prefixCls}-line ${
    iconSide === 'left' ? 'right' : iconSide === 'right' ? 'left' : ''
  }`;
  const textCls = `${prefixCls}-text`;
  const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;

  const renderedIcon = !!iconSrc ?
    <img src={iconSrc} alt="" />:
    <span className={icon} /> ;

  const iconComp = (
    <div className={iconCls}>
      {renderedIcon}
    </div>
  );

  return (
    <div className={buttonCls}>
      <button
        tabIndex={0}
        className={inputCls}
        style={{ backgroundColor: isFocused ? (focusColor || colors.defaultFocusColor) : colors.grayscale20 }}
        form={form}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formNoValidate={formNoValidate}
        formTarget={formTarget}
        name={name}
        type={type}
        ref={forwardedRef}
        onClick={onClick}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        {iconSide === 'left' ? iconComp : null}
        <div className={lineCls}>
          <span className={textCls}>{text}</span>
        </div>
        {iconSide === 'right' ? iconComp : null}
      </button>
    </div>
  );
});
export default React.forwardRef((props:LocalProps, ref) => (
  <SoftKeyConsumer>
    {context => (
      <Button softKeyManager={context} forwardedRef={ref} {...props} />
    )}
  </SoftKeyConsumer>
));
