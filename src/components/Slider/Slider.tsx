import React, { useCallback, useState } from 'react';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer, SoftKeyManagerProps } from '../SoftKey/withSoftKeyManager';
import './Slider.scss';
import { SoftKeyContextProps } from '../SoftKey/SoftKeyProvider';

const prefixCls = 'kai-slider';

interface LocalProps {
  header: string;
  initialValue?: number;
  maxValue?:number;
  minValue?:number;
  stepSize?: number;
  focusColor?:string;
  forwardedRef?:any;
  index?:number;
  onFocusChange?: (index:number) => void;
  softKeyManager?: SoftKeyContextProps;
  softKeyLeftText?: string;
  softKeyRightText?: string;
}

const Slider = React.memo<LocalProps>(props => {
  const {
    header,
    initialValue,
    maxValue,
    minValue,
    stepSize,
    focusColor,
    forwardedRef,
    index,
    onFocusChange,
    softKeyManager,
    softKeyLeftText,
    softKeyRightText,
  } = props;

  const [isFocused, setFocused] = useState(false);
  const [sliderValue, setSliderValue] = useState(initialValue);

  const lineCls = `${prefixCls}-line`;
  const headerCls = `${prefixCls}-header`;
  const trackerCls = `${prefixCls}-tracker`;
  const sliderWrapperCls = `${prefixCls}-slider-wrapper`;

  const handleFocusChange = useCallback(
    isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        softKeyManager.setSoftKeyTexts({
          leftText: softKeyLeftText,
          rightText: softKeyRightText,
        });
        softKeyManager.setSoftKeyCallbacks({
          leftCallback: handleDecrementSlider,
          rightCallback: handleIncrementSlider,
        });
        onFocusChange(index);
      } else {
        softKeyManager.unregisterSoftKeys();
      }
    },
    [index, onFocusChange, softKeyManager, softKeyLeftText, softKeyRightText]
  );

  const handleDecrementSlider = () => setSliderValue(prevVal => prevVal - 1);

  const handleIncrementSlider = () => setSliderValue(prevVal => prevVal + 1);

  const handleSliderChange = event => setSliderValue(event.target.value);
  const style = {
    '--min': minValue,
    '--max': maxValue,
    '--val': sliderValue,
    '--slider-left-filler-color': isFocused ? colors.white : (focusColor || colors.defaultFocusColor),
    '--slider-thumb-border-color': isFocused
      ? (focusColor || colors.defaultFocusColor)
      : colors.white,
  } as React.CSSProperties;

  return (
    <div
      tabIndex={0}
      className={prefixCls}
      style={{ backgroundColor: isFocused ? (focusColor || colors.defaultFocusColor) : colors.white }}
      ref={forwardedRef}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      <div className={lineCls}>
        <span className={headerCls}>{header}</span>
        <span className={trackerCls}>{`${sliderValue}/${maxValue}`}</span>
      </div>
      
      <div className={sliderWrapperCls}>
        <input
          ref={forwardedRef}
          type="range"
          min={minValue}
          max={maxValue}
          step={stepSize}
          value={sliderValue}
          onChange={handleSliderChange}
          style={style}
        />
      </div>
    </div>
  );
});

export default React.forwardRef((props:LocalProps, ref) => (
  <SoftKeyConsumer>
    {context => (
      <Slider softKeyManager={context} forwardedRef={ref} {...props} />
    )}
  </SoftKeyConsumer>
));
