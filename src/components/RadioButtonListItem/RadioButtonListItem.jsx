import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './RadioButtonListItem.scss';

const prefixCls = 'kai-rbl';

const RadioButtonListItem = React.memo(props => {
  const {
    primary,
    secondary,
    initButtonVal,
    onInputChange,
    buttonSide,
    onFocusChange,
    focusColor,
    index,
    forwardedRef,
    softKeyManager,
    softKeyCheckedText,
    softKeyUncheckedText,
    softKeyCheckedIcon,
    softKeyUncheckedIcon,
  } = props;

  // Managed vs self-managed radio buttons
  const [isChecked, setChecked] = useState(initButtonVal);
  const [isFocused, setFocused] = useState(false);

  const itemCls = prefixCls;
  const buttonCls = `${prefixCls}-button`;
  const lineCls = `${prefixCls}-line ${
    buttonSide === 'left' ? 'right' : 'left'
  }`;
  const primaryCls = `${prefixCls}-primary`;
  const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
  const inputCls = `${buttonCls}-input-${isFocused ? 'focused' : 'unfocused'}`;

  useEffect(() => {
    const centerText = isChecked ? softKeyCheckedText : softKeyUncheckedText;
    const centerIcon = isChecked ? softKeyCheckedIcon : softKeyUncheckedIcon;
    if (isFocused) {
      if (centerIcon != null) {
        softKeyManager.setCenterIcon(centerIcon);
      } else {
        softKeyManager.setCenterText(centerText);
      }
    }
  }, [
    isFocused,
    isChecked,
    softKeyManager,
    softKeyCheckedText,
    softKeyUncheckedText,
    softKeyCheckedIcon,
    softKeyUncheckedIcon,
  ]);

  const handleInputChange = e => {
    setChecked(e.target.checked);
    onInputChange(e.target.checked);
  };

  // We want to avoid losing focus on the parent element
  const handleButtonFocus = e => {
    e.preventDefault();
    if (e.relatedTarget) {
      // Revert focus back to previous blurring element
      e.relatedTarget.focus();
    } else {
      // No previous focus target, blur instead
      e.currentTarget.blur();
    }
  };

  const handleFocusChange = useCallback(
    isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        const centerText = isChecked
          ? softKeyCheckedText
          : softKeyUncheckedText;
        const centerIcon = isChecked
          ? softKeyCheckedIcon
          : softKeyUncheckedIcon;
        if (centerIcon != null) {
          softKeyManager.setCenterIcon(centerIcon);
        } else {
          softKeyManager.setSoftKeyTexts({ centerText });
        }

        softKeyManager.setSoftKeyCallbacks({
          centerCallback: () => setChecked(true),
        });
        onFocusChange(index);
      } else {
        softKeyManager.unregisterSoftKeys();
      }
    },
    [
      index,
      isChecked,
      onFocusChange,
      softKeyManager,
      softKeyCheckedText,
      softKeyUncheckedText,
      softKeyCheckedIcon,
      softKeyUncheckedIcon,
    ]
  );

  const radioBtn = (
    <div className={buttonCls}>
      <input
        className={inputCls}
        tabIndex="-1"
        type="radio"
        checked={props.isChecked !== null ? props.isChecked : isChecked}
        onChange={() => {}}
        onFocus={handleButtonFocus}
        onClick={handleInputChange}
      />
    </div>
  );

  return (
    <div
      tabIndex="0"
      className={itemCls}
      style={{ backgroundColor: isFocused ? focusColor : colors.white }}
      ref={forwardedRef}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      {buttonSide === 'left' ? radioBtn : null}
      <div className={lineCls}>
        <span className={primaryCls}>{primary}</span>
        <label className={secondaryCls}>{secondary}</label>
      </div>
      {buttonSide === 'right' ? radioBtn : null}
    </div>
  );
});

RadioButtonListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  // Used for unmanaged radio buttons
  initButtonVal: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  // For direct management over the radio button value
  isChecked: PropTypes.bool,
  buttonSide: PropTypes.oneOf(['left', 'right']).isRequired,
  // For ListView navigation
  onFocusChange: PropTypes.func,
  focusColor: PropTypes.string,
  index: PropTypes.number,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  // For softkey
  softKeyCheckedText: PropTypes.string,
  softKeyUncheckedText: PropTypes.string,
  softKeyCheckedIcon: PropTypes.string,
  softKeyUncheckedIcon: PropTypes.string,
};

RadioButtonListItem.defaultProps = {
  secondary: null,
  isChecked: null,
  focusColor: colors.defaultFocusColor,
  softKeyCheckedText: '',
  softKeyUncheckedText: 'Select',
  softKeyCheckedIcon: null,
  softKeyUncheckedIcon: null,
};

export default React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
    {context => (
      <RadioButtonListItem
        softKeyManager={context}
        forwardedRef={ref}
        {...props}
      />
    )}
  </SoftKeyConsumer>
));
