import React from 'react';
import PropTypes from 'prop-types';
import './CheckboxListItem.scss';

const prefixCls = 'kai-cbl';

class CheckboxListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.initCheckboxVal,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.setState(prevState => {
      return { ...prevState, isChecked: !prevState.isChecked };
    });
    this.props.onInputChange();
  }
  render() {
    const { checkboxSide, primary, secondary } = this.props;

    const itemCls = prefixCls;
    const boxCls = `${prefixCls}-box`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

    return (
      <div tabIndex="0" className={itemCls}>
        {checkboxSide === 'left' ? (
          <div className={boxCls}>
            <input
              tabIndex="-1"
              type="checkbox"
              checked={this.state.isChecked}
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
              tabIndex="-1"
              type="checkbox"
              data-icon="&#x2705;"
              checked={this.state.isChecked}
              onChange={this.handleInputChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

CheckboxListItem.defaultProps = {
  secondary: null,
};

CheckboxListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  initCheckboxVal: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  checkboxSide: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default CheckboxListItem;
