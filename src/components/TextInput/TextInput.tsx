import React, { useState, ChangeEvent } from 'react';
import classnames from 'classnames';

import './TextInput.scss';

interface LocalProps {
  id?: string;
  focusClass?: string,
  label?: string,
  index?: number,
  onFocusChange?: (index: number) => void,
  forwardedRef?: any,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  enableTabSwitching?: boolean,
  initialValue?: string,
  placeholder?: string,
  isNumeric?: boolean,
  validationError?: string
};

const prefixCls = 'kai-text-input';

const TextInput = React.memo<LocalProps>(
  props => {
    const {
      id,
      focusClass,
      label,
      index,
      onFocusChange,
      forwardedRef,
      onChange,
      enableTabSwitching,
      initialValue,
      placeholder,
      isNumeric,
      validationError
    } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const [value, setValue] = useState((initialValue||''));

  const handleKeyUp = (event) => {
    if (enableTabSwitching) {
      if (
        (event.key === 'ArrowLeft' && caretPosition !== 0) ||
        (event.key === 'ArrowRight' && caretPosition !== value.length)
      ) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }
    } else {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    setCaretPosition(event.target.selectionStart);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if(onChange)
      onChange(event);
  };

  const handleFocusChange = (isFocused) => {
    const input = forwardedRef.current;
    setIsFocused(isFocused);
    if (isFocused) {
      onFocusChange(index);
      input.focus();
      // Without this, it will just focus at position 0
      requestAnimationFrame(() => {
        input.selectionStart = caretPosition;
      })
    }
  };

  const errorCls = validationError ? `${prefixCls}-error` : '';
  const itemCls = classnames([
    prefixCls,
    isFocused && `${prefixCls}--focused ${(focusClass||'')}`,
    errorCls
  ]);
  const labelCls = `${prefixCls}-label p-thi`;
  const inputCls = `${prefixCls}-input p-pri`;

  return (
    <div
      id={id}
      tabIndex={0}
      className={itemCls}
      //style={{ backgroundColor: isFocused ? (focusColor || colors.defaultFocusColor) : colors.white }}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      <label className={labelCls}>{validationError ? validationError : label}</label>
      <input
        ref={forwardedRef}
        type={isNumeric ? "tel": "text"}
        className={inputCls}
        onChange={handleChange}
        onKeyUpCapture={handleKeyUp}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
});

export default React.forwardRef((props:LocalProps, ref) => (
  <TextInput forwardedRef={ref} {...props} />
));
