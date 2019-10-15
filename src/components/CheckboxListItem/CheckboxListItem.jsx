import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyContext } from '../SoftKey/SoftKeyProvider';
import './CheckboxListItem.scss';

const prefixCls = 'kai-cbl';

const CheckboxListItem = React.memo(
  React.forwardRef((props, ref) => {
    const {
      primary,
      secondary,
      initCheckboxVal,
      onInputChange,
      checkboxSide,
      focusColor,
      onFocusChange,
      index,
      softKeyCheckedText,
      softKeyUncheckedText,
    } = props;

    const softKeyManager = useContext(SoftKeyContext)

    // Managed vs self-managed radio buttons
    const [isChecked, setChecked] = useState(initCheckboxVal);
    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const boxCls = `${prefixCls}-box`;
    const lineCls = `${prefixCls}-line ${
      checkboxSide === 'left' ? 'right' : 'left'
    }`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const inputCls = `${boxCls}-input-${isFocused ? 'focused' : 'unfocused'}`;

    useEffect(() => {
      const centerText = isChecked ? softKeyCheckedText : softKeyUncheckedText;
      if (isFocused) {
        softKeyManager.setCenterText(centerText);
      }
    }, [
      isFocused,
      isChecked,
      softKeyManager,
      softKeyCheckedText,
      softKeyUncheckedText,
    ]);

    const handleInvertCheck = () => setChecked(wasChecked => !wasChecked);

    const handleInputChange = e => {
      setChecked(e.target.checked);
      onInputChange(e.target.checked);
    };

    // We want to avoid losing focus on the parent element
    const handleCheckFocus = e => {
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
          softKeyManager.setSoftKeyTexts({ centerText });
          softKeyManager.setSoftKeyCallbacks({
            centerCallback: handleInvertCheck,
          });
          onFocusChange(index);
        } else {
          softKeyManager.unregisterSoftKeys();
        }
      },
      [
        index,
        onFocusChange,
        isChecked,
        softKeyCheckedText,
        softKeyUncheckedText,
        softKeyManager,
      ]
    );

    const checkbox = (
      <div className={boxCls}>
        <input
          className={inputCls}
          tabIndex="-1"
          type="checkbox"
          checked={props.isChecked !== null ? props.isChecked : isChecked}
          onChange={() => {}}
          onFocus={handleCheckFocus}
          onClick={handleInputChange}
        />
      </div>
    );

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={ref}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        {checkboxSide === 'left' ? checkbox : null}
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
        {checkboxSide === 'right' ? checkbox : null}
      </div>
    );
  }
));

CheckboxListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  // Used for unmanaged checkboxes
  initCheckboxVal: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  // For direct management over the checkbox value
  isChecked: PropTypes.bool,
  checkboxSide: PropTypes.oneOf(['left', 'right']).isRequired,
  focusColor: PropTypes.string,
  // For ListView navigation
  onFocusChange: PropTypes.func,
  index: PropTypes.number,
  // For softkey
  softKeyCheckedText: PropTypes.string,
  softKeyUncheckedText: PropTypes.string,
};

CheckboxListItem.defaultProps = {
  secondary: null,
  isChecked: null,
  focusColor: colors.defaultFocusColor,
  softKeyCheckedText: 'Deselect',
  softKeyUncheckedText: 'Select',
};

export default CheckboxListItem;
