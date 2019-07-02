import React from 'react';
import './Separator.scss';

const prefixCls = 'kai-separator';
function Separator(props) {
  const { separatorText } = props;
  const textCls = `${prefixCls}-text`;
  return (
    <div className={prefixCls}>
      <span className={textCls}>{separatorText}</span>
    </div>
  );
}

export default Separator;
