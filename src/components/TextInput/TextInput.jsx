import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import colors from '../../theme/colors.scss';

import './TextInput.scss';

const prefixCls = 'kai-text-input';

class TextInput extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isFocused: false
    };
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  handleFocusChange(isFocused) {
    this.setState({ isFocused });
    if (isFocused) {
      this.props.onFocusChange(this.props.index);
      this.props.forwardedRef.current.focus();
    }
  }

  render() {
    const { focusColor, forwardedRef, label, onChange } = this.props;
    const { isFocused } = this.state;

    const itemCls = classnames([
      prefixCls,
      isFocused && `${prefixCls}--focused`
    ]);
    const labelCls = `${prefixCls}-label`;
    const inputCls = `${prefixCls}-input`;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        onFocus={() => this.handleFocusChange(true)}
        onBlur={() => this.handleFocusChange(false)}
      >
        <label className={labelCls}>{label}</label>
        <input
          ref={forwardedRef}
          type="text"
          className={inputCls}
          onChange={onChange}
        />
      </div>
    );
  }
}

TextInput.defaultProps = {
  focusColor: colors.defaultFocusColor,
  onChange: () => {}
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  onChange: PropTypes.func
};

export default React.forwardRef((props, ref) => (
  <TextInput forwardedRef={ref} {...props} />
));
