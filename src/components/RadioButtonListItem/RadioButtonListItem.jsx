import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './RadioButtonListItem.scss';

const prefixCls = 'kai-rbl';

class RadioButtonListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.initButtonVal,
      isFocused: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleCheckButton = this.handleCheckButton.bind(this);
  }

  handleCheckButton() {
    this.setState({ isChecked: true });
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
      this.props.softKeyManager.setSoftKeyTexts({ centerText: 'Select' });
      this.props.softKeyManager.setSoftKeyCallbacks({
        centerCallback: this.handleCheckButton,
      });
      this.props.onFocusChange(this.props.index);
    } else {
      this.props.softKeyManager.unregisterSoftKeys();
    }
  }

  render() {
    const {
      buttonSide,
      primary,
      secondary,
      focusColor,
      forwardedRef,
    } = this.props;
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
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
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
  focusColor: colors.defaultFocusColor,
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
  focusColor: PropTypes.string,
  index: PropTypes.number,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
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
