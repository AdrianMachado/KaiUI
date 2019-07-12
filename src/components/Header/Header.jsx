import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import './Header.scss';

const prefixCls = 'kai-header';
const Header = React.memo(function Header({ text, backgroundColor }) {
  return (
    <header className={prefixCls} style={{ background: backgroundColor }}>
      <h1 className="h1">{text}</h1>
    </header>
  );
});

Header.defaultProps = {
  backgroundColor: colors.headerPurple,
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

export default Header;
