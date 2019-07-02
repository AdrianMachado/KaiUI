import React from 'react';
import PropTypes from 'prop-types';
import './RadioButtonListItem.scss';

const prefixCls = 'kai-rbl';

class RadioButtonListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.initButtonVal,
      isFocused: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  handleInputChange(e) {
    const newCheckedVal = e.target.checked;
    this.setState({ isChecked: newCheckedVal });
    this.props.onInputChange(newCheckedVal);
  }

  // We want to avoid losing focus on the parent element
  handleButtonFocus(e) {
    e.preventDefault();
    if (e.relatedTarget) {
      // Revert focus back to previous blurring element
      e.relatedTarget.focus();
    } else {
      // No previous focus target, blur instead
      e.currentTarget.blur();
    }
  }

  handleFocusChange(isFocused) {
    this.setState({ isFocused });
    if (isFocused) {
      this.props.onFocusChange(this.props.index);
    }
  }

  render() {
    const { buttonSide, primary, secondary, forwardedRef } = this.props;
    const { isFocused } = this.state;

    // Managed vs self-managed radio buttons
    const isChecked =
      this.props.isChecked != null
        ? this.props.isChecked
        : this.state.isChecked;

    const itemCls = prefixCls;
    const buttonCls = `${prefixCls}-button`;
    const lineCls = `${prefixCls}-line ${
      buttonSide === 'left' ? 'right' : 'left'
    }`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const inputCls = `${buttonCls}-input-${
      isFocused ? 'focused' : 'unfocused'
    }`;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        ref={forwardedRef}
        onFocus={() => this.handleFocusChange(true)}
        onBlur={() => this.handleFocusChange(false)}
      >
        {buttonSide === 'left' ? (
          <div className={buttonCls}>
            <input
              className={inputCls}
              tabIndex="-1"
              type="radio"
              checked={isChecked}
              onChange={() => {}}
              onFocus={this.handleButtonFocus}
              onClick={this.handleInputChange}
            />
          </div>
        ) : null}
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
        {buttonSide === 'right' ? (
          <div className={buttonCls}>
            <input
              className={inputCls}
              tabIndex="-1"
              type="radio"
              checked={isChecked}
              onChange={() => {}}
              onFocus={this.handleButtonFocus}
              onClick={this.handleInputChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

RadioButtonListItem.defaultProps = {
  secondary: null,
  isChecked: null,
};

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
  index: PropTypes.number,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default React.forwardRef((props, ref) => (
  <RadioButtonListItem forwardedRef={ref} {...props} />
));
