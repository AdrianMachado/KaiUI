import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './Tab.scss';

const prefixCls = 'kai-tab';

const Tab = React.memo(
  props => {
    const {
      index,
      label,
      onTabChange,
      isActive,
      focusColor
    } = props;

    const actPrefixCls = `${prefixCls}${isActive ? '-active' : '-inactive'}`;

    const handleClick = () => onTabChange(index);

    return (
      <div
        onClick={handleClick}
        className={actPrefixCls}
        style={{ '--tab-underline-color': focusColor }}
      >
        <div className={`${actPrefixCls}-label`}>{label}</div>
      </div>
    );
  }
);

Tab.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  onTabChange: PropTypes.func,
  isActive: PropTypes.bool,
  focusColor: PropTypes.string,
};

Tab.defaultProps = {
  index: 0,
  label: null,
  onTabChange: () => {},
  isActive: false,
  focusColor: colors.defaultFocusColor,
};

export default Tab;
