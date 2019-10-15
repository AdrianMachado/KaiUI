import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyContext } from '../SoftKey/SoftKeyProvider';
import './Slider.scss';

const prefixCls = 'kai-slider';

const Slider = React.memo(
  React.forwardRef((props, ref) => {
    const {
      header,
      initialValue,
      maxValue,
      minValue,
      stepSize,
      focusColor,
      index,
      onFocusChange,
      softKeyLeftText,
      softKeyRightText,
    } = props;

    const softKeyManager = useContext(SoftKeyContext);

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
        ref={ref}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        <div className={lineCls}>
          <span className={headerCls}>{header}</span>
          <span className={trackerCls}>{`${sliderValue}/${maxValue}`}</span>
        </div>

        <div className={sliderWrapperCls}>
          <input
            ref={ref}
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
  }
));

Slider.propTypes = {
  header: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  stepSize: PropTypes.number,
  focusColor: PropTypes.string,
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

export default Slider;
