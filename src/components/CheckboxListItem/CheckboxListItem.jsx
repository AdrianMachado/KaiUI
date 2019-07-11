import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './CheckboxListItem.scss';

const prefixCls = 'kai-cbl';

class CheckboxListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.initCheckboxVal,
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
  handleCheckFocus(e) {
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
    const {
      checkboxSide,
      primary,
      secondary,
      focusColor,
      forwardedRef,
    } = this.props;
    const { isFocused } = this.state;

    // Managed vs self-managed checkboxes
    const isChecked =
      this.props.isChecked != null
        ? this.props.isChecked
        : this.state.isChecked;

    const itemCls = prefixCls;
    const boxCls = `${prefixCls}-box`;
    const lineCls = `${prefixCls}-line ${
      checkboxSide === 'left' ? 'right' : 'left'
    }`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const inputCls = `${boxCls}-input-${isFocused ? 'focused' : 'unfocused'}`;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={forwardedRef}
        onFocus={() => this.handleFocusChange(true)}
        onBlur={() => this.handleFocusChange(false)}
      >
        {checkboxSide === 'left' ? (
          <div className={boxCls}>
            <input
              className={inputCls}
              tabIndex="-1"
              type="checkbox"
              checked={isChecked}
              onChange={() => {}}
              onFocus={this.handleCheckFocus}
              onClick={this.handleInputChange}
            />
          </div>
        ) : null}
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
        {checkboxSide === 'right' ? (
          <div className={boxCls}>
            <input
              className={inputCls}
              tabIndex="-1"
              type="checkbox"
              checked={isChecked}
              onChange={() => {}}
              onFocus={this.handleCheckFocus}
              onClick={this.handleInputChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

CheckboxListItem.defaultProps = {
  secondary: null,
  isChecked: null,
  focusColor: colors.defaultFocusColor,
};

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
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default React.forwardRef((props, ref) => (
  <CheckboxListItem forwardedRef={ref} {...props} />
));
