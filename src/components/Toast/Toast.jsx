import React from 'react';
import classnames from 'classnames';

import './Toast.scss';

const Toast = ({ text, isDisplayed }) => {
  const prefixCls = 'kai-toast';  
  const itemCls = classnames(
      prefixCls,
      isDisplayed && `${prefixCls}--displayed`,
  );

  return (
    <h1 className={itemCls}>{text}</h1>
  )
};

export default Toast;
