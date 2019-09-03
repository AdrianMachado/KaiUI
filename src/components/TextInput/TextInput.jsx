import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import colors from '../../theme/colors.scss';

import './TextInput.scss';

const prefixCls = 'kai-text-input';

const TextInput = ({ focusColor, label, index, onFocusChange, forwardedRef, onChange}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const handleKeyUp = (event) => {
    setCaretPosition(event.target.selectionStart);
  }

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
  }

  const itemCls = classnames([
    prefixCls,
    isFocused && `${prefixCls}--focused`
  ]);
  const labelCls = `${prefixCls}-label`;
  const inputCls = `${prefixCls}-input`;

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
        onChange={onChange}
        onKeyUp={(e) => handleKeyUp(e)}
      />
    </div>
  );
}

TextInput.defaultProps = {
  focusColor: colors.defaultFocusColor,
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
  onChange: PropTypes.func
};

export default React.forwardRef((props, ref) => (
  <TextInput forwardedRef={ref} {...props} />
));
