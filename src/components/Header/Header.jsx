import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

const prefixCls = 'kai-header';

const Header = ({ text }) => (
  <header className={prefixCls}>
    <h1 className="h1">
      {text}
    </h1>
  </header>
);

Header.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Header;