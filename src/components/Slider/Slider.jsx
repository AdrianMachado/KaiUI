import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './Slider.scss';

const prefixCls = 'kai-slider';

class Slider extends React.PureComponent {
  slider = React.createRef();
  constructor(props) {
    super(props);
    this.state = { isFocused: false, sliderValue: props.initialValue };
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleFocusChange(isFocused) {
    this.setState({ isFocused });
    if (isFocused) {
      this.props.onFocusChange(this.props.index);
    }
  }

  handleSliderChange(event) {
    const sliderValue = event.target.value;
    this.setState({ sliderValue });
  }

  render() {
    const {
      header,
      maxValue,
      minValue,
      stepSize,
      focusColor,
      forwardedRef,
    } = this.props;
    const { isFocused, sliderValue } = this.state;
    const lineCls = `${prefixCls}-line`;
    const sliderWrapperCls = `${prefixCls}-slider-wrapper`;

    return (
      <div
        tabIndex="0"
        className={prefixCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={forwardedRef}
        onFocus={() => this.handleFocusChange(true)}
        onBlur={() => this.handleFocusChange(false)}
      >
        <span className={lineCls}>{header}</span>
        <div className={sliderWrapperCls}>
          <input
            ref={this.slider}
            type="range"
            min={minValue}
            max={maxValue}
            step={stepSize}
            value={sliderValue}
            onChange={this.handleSliderChange}
            style={{
              '--min': minValue,
              '--max': maxValue,
              '--val': sliderValue,
              '--slider-left-filler-color': isFocused
                ? colors.white
                : focusColor,
              '--slider-thumb-border-color': isFocused
                ? focusColor
                : colors.white,
            }}
          />
        </div>
      </div>
    );
  }
}

Slider.defaultProps = {
  focusColor: colors.defaultFocusColor,
  stepSize: 1,
};

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
};

export default React.forwardRef((props, ref) => (
  <Slider forwardedRef={ref} {...props} />
));
