import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './Tab.scss';

const prefixCls = 'kai-tab';

// TODO: Convert to function component
class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onTabChange(this.props.index);
  }

  render() {
    const { label, isActive, focusColor } = this.props;
    const actPrefixCls = `${prefixCls}${isActive ? '-active' : '-inactive'}`;
    return (
      <div
        onClick={this.handleClick}
        className={actPrefixCls}
        style={{ '--tab-underline-color': focusColor }}
      >
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
  focusColor: colors.defaultFocusColor,
};

Tab.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  onTabChange: PropTypes.func,
  isActive: PropTypes.bool,
  focusColor: PropTypes.string,
};

export default Tab;
