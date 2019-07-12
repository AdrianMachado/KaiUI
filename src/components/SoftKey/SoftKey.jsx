import React from 'react';
import PropTypes from 'prop-types';

import './SoftKey.scss';

const prefixCls = 'kai-softkey';

const Button = props => {
  return (
    <button
      className={`${prefixCls}-btn`}
      onClick={e => handleButtonClick(e, props.handleClick)}
    >
      {props.icon ? <i class={props.icon} /> : null}
      {props.text}
    </button>
  );
};

const handleButtonClick = (e, handleClick) => {
  e.preventDefault();
  handleClick();
};

// TODO: convert to functional with Hooks

class SoftKey extends React.PureComponent {
  constructor(props) {
    super(props);
    document.addEventListener('keydown', e => this.handleKeyDown(e, props));
  }

  handleKeyDown(e, props) {
    switch (e.key) {
      case 'SoftLeft':
        // Action case press left key
        props.leftCallback();
        break;

      case 'SoftRight':
        // Action case press right key
        props.rightCallback();
        break;

      case 'Enter':
        // Action case press center key
        props.centerCallback();
        break;
      default:
        break;
    }
  }

  render() {
    const {
      leftCallback,
      rightCallback,
      centerCallback,
      leftText,
      rightText,
      centerText,
      centerIcon,
    } = this.props;
    return (
      <div className={`${prefixCls} visible`}>
        <Button pos="left" text={leftText} handleClick={leftCallback} />
        <Button
          pos="center"
          text={centerText}
          icon={centerIcon}
          handleClick={centerCallback}
        />
        <Button pos="right" text={rightText} handleClick={rightCallback} />
      </div>
    );
  }
}

SoftKey.defaultProps = {
  leftText: '',
  centerText: '',
  rightText: '',
  centerIcon: null,
  leftCallback: () => {},
  centerCallback: () => {},
  rightCallback: () => {},
};

SoftKey.propTypes = {
  leftText: PropTypes.string,
  centerText: PropTypes.string,
  rightText: PropTypes.string,
  centerIcon: PropTypes.string,
  leftCallback: PropTypes.func,
  centerCallback: PropTypes.func,
  rightCallback: PropTypes.func,
};

export default SoftKey;
