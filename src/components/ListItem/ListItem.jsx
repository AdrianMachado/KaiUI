import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

const prefixCls = 'kai-list-item';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.initCheckboxVal,
    };
  }
  render() {
    const {
      focusable,
      includeCheckbox,
      checkboxSide,
      icon,
      includeArrow,
      primary,
      secondary,
    } = this.props;

    const itemCls = `${prefixCls} ${focusable ? 'focusable' : ''}`;
    const iconCls = `${prefixCls}-icon ${icon ? '' : 'hidden'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;

    const checkboxLeft = includeCheckbox && checkboxSide === 'left';
    const checkboxRight = includeCheckbox && checkboxSide === 'right';
    return (
      <div className={itemCls}>
        <div className={iconCls}>
          {item != null ? <i class={icon} /> : null}
          {checkboxLeft ? (
            <input type="checkbox" checked={this.state.isChecked} />
          ) : null}
        </div>
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
      </div>
    );
  }
}

ListItem.defaultProps = {
  icon: null,
  secondary: null,
  includeCheckbox: false,
  initCheckboxVal: false,
  includeArrow: false,
};

ListItem.propTypes = {
  focusable: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  includeCheckbox: PropTypes.bool,
  initCheckboxVal: PropTypes.bool,
  includeArrow: PropTypes.bool,
  onInputChange: PropTypes.func,
  checkboxSide: PropTypes.oneOf(['left', 'right']),
};
