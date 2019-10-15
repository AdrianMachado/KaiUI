import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './Slider.scss';

const prefixCls = 'kai-slider';

const Slider = React.memo(props => {
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

  return (
    <div
      tabIndex="0"
      className={prefixCls}
      style={{ backgroundColor: isFocused ? focusColor : colors.white }}
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
          style={{
            '--min': minValue,
            '--max': maxValue,
            '--val': sliderValue,
            '--slider-left-filler-color': isFocused ? colors.white : focusColor,
            '--slider-thumb-border-color': isFocused
              ? focusColor
              : colors.white,
          }}
        />
      </div>
    </div>
  );
});

Slider.propTypes = {
  header: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  stepSize: PropTypes.number,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  // For softkey
  softKeyLeftText: PropTypes.string,
  softKeyRightText: PropTypes.string,
};

Slider.defaultProps = {
  focusColor: colors.defaultFocusColor,
  stepSize: 1,
  softKeyLeftText: '-',
  softKeyRightText: '+',
};

export default React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
    {context => (
      <Slider softKeyManager={context} forwardedRef={ref} {...props} />
    )}
  </SoftKeyConsumer>
));
