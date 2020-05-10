import React, { useEffect, useState, useCallback } from 'react';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './CheckboxListItem.scss';
import { SoftKeyContextProps } from '../SoftKey/SoftKeyProvider';

const prefixCls = 'kai-cbl';

interface LocalProps {
  id?:string;
  primary: string;
  secondary?:string;
  initCheckboxVal?:boolean;
  isChecked?:boolean;
  onInputChange?: (checked: any) => void;
  checkboxSide?: "left" | "right";
  focusColor?:string;
  onFocusChange?: (index: number) => void;
  index?: number;
  forwardedRef?:any;
  softKeyManager?: SoftKeyContextProps;
  softKeyCheckedText?:string;
  softKeyUncheckedText?:string;
  softKeyCheckedIcon?: any;
  softKeyUncheckedIcon?: any;
}

const CheckboxListItem = React.memo<LocalProps>(props => {
  const {
    id,
    primary,
    secondary,
    initCheckboxVal,
    onInputChange,
    checkboxSide,
    focusColor,
    onFocusChange,
    index,
    forwardedRef,
    softKeyManager,
    softKeyCheckedText,
    softKeyUncheckedText,
    softKeyCheckedIcon,
    softKeyUncheckedIcon,
  } = props;

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

  const handleInvertCheck = () => setChecked(wasChecked => !wasChecked);

  const handleInputChange = (e) => {
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
        const centerIcon = isChecked
          ? softKeyCheckedIcon
          : softKeyUncheckedIcon;
        if (centerIcon != null) {
          softKeyManager.setCenterIcon(centerIcon);
        } else {
          softKeyManager.setSoftKeyTexts({ centerText });
        }
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
      softKeyCheckedIcon,
      softKeyUncheckedIcon,
      softKeyManager,
    ]
  );

  const checkbox = (
    <div className={boxCls}>
      <input
        id={id}
        className={inputCls}
        tabIndex={-1}
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
      tabIndex={0}
      className={itemCls}
      style={{ backgroundColor: isFocused ? (focusColor || colors.defaultFocusColor) : colors.white }}
      ref={forwardedRef}
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
});

export default React.forwardRef((props: LocalProps, ref) => (
  <SoftKeyConsumer>
    {context => (
      <CheckboxListItem
        softKeyManager={context}
        forwardedRef={ref}
        {...props}
      />
    )}
  </SoftKeyConsumer>
));
