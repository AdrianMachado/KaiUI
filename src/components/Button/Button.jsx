import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './Button.scss';

const prefixCls = 'kai-button';

class RadioButtonListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleFocusChange = this.handleFocusChange.bind(this);
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
    const { primary, icon, iconSide, focusColor, forwardedRef } = this.props;
    const { isFocused } = this.state;

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
  icon: null,
  iconSide: null,
  focusColor: colors.defaultFocusColor,
};

RadioButtonListItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconSide: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func.isRequired,
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
