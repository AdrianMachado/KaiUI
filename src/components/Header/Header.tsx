import React from 'react';
import './Header.scss';
import classNames from 'classnames';

const prefixCls = 'kai-header';

interface LocalProps {
  text: string;
  backgroundColor?: string;
  imgSrc?: string;
  className?: string;
}

const Header = React.memo<LocalProps>(
  props => {
    const {
      text,
      backgroundColor,
      imgSrc,
      className
    } = props;

return (
      <header className={classNames(prefixCls, (className || ''))} style={{ background: backgroundColor}}>
        {(imgSrc ? <img src={imgSrc} style={{height: "20px"}} /> : <h1 className="h1">{text}</h1>)}
      </header>
    );
  }
);

export default Header;
