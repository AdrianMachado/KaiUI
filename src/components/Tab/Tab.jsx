import React from 'react';
import PropTypes from 'prop-types';
import './Tab.scss';

const prefixCls = 'kai-tab';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onTabChange(this.props.index);
  }

  render() {
    const { label, isActive } = this.props;
    const actPrefixCls = `${prefixCls}${isActive ? '-active' : '-inactive'}`;
    return (
      <div onClick={this.handleClick} className={actPrefixCls}>
        <div className={`${actPrefixCls}-label`}>{label}</div>
      </div>
    );
  }
}

Tab.defaultProps = {
  index: 0,
  label: null,
  onTabChange: () => {},
  isActive: false,
};

Tab.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  onTabChange: PropTypes.func,
  isActive: PropTypes.bool,
};

export default Tab;
