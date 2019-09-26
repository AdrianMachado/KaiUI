import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import colors from '../../theme/colors.scss';

import './TextInput.scss';

const prefixCls = 'kai-text-input';

const TextInput = ({
  focusColor,
  label,
  index,
  onFocusChange,
  forwardedRef,
  onChange,
  enableTabSwitching,
  ...props,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const [value, setValue] = useState('');

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

  const itemCls = classnames([
    prefixCls,
    isFocused && `${prefixCls}--focused`
  ]);
  const labelCls = `${prefixCls}-label p-thi`;
  const inputCls = `${prefixCls}-input p-pri`;

  return (
    <div
      tabIndex="0"
      className={itemCls}
      style={{ backgroundColor: isFocused ? focusColor : colors.white }}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      <label className={labelCls}>{label}</label>
      <input
        ref={forwardedRef}
        type="text"
        className={inputCls}
        onChange={handleChange}
        onKeyUpCapture={handleKeyUp}
        value={value}
        {...props}
      />
    </div>
  );
}

TextInput.defaultProps = {
  focusColor: colors.defaultFocusColor,
  enableTabSwitching: false,
  onChange: () => {}
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  onChange: PropTypes.func,
  enableTabSwitching: PropTypes.bool,
};

export default React.forwardRef((props, ref) => (
  <TextInput forwardedRef={ref} {...props} />
));
