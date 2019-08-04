import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './Button.scss';

const prefixCls = 'kai-button';

const Button = React.memo(props => {
  const {
    text,
    icon,
    iconSide,
    onClick,
    focusColor,
    onFocusChange,
    index,
    forwardedRef,
    softKeyManager,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocusChange = isNowFocused => {
    setIsFocused(isNowFocused);
    if (isNowFocused) {
      const centerText = 'Select';
      softKeyManager.setSoftKeyTexts({ centerText });
      softKeyManager.setSoftKeyCallbacks({
        centerCallback: onClick,
      });
      onFocusChange(index);
    } else {
      softKeyManager.unregisterSoftKeys();
    }
  };

  const buttonCls = prefixCls;
  const inputCls = `${prefixCls}-input`;
  const lineCls = `${prefixCls}-line ${iconSide === 'left' ? 'right' : 'left'}`;
  const textCls = `${prefixCls}-text`;
  const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;

  const iconComp = (
    <div className={iconCls}>
      <span className={icon} />
    </div>
  );

  return (
    <div className={buttonCls}>
      <button
        tabIndex="0"
        className={inputCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.grayscale20 }}
        ref={forwardedRef}
        onClick={onClick}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        {iconSide === 'left' ? iconComp : null}
        <div className={lineCls}>
          <span className={textCls}>{text}</span>
        </div>
        {iconSide === 'right' ? iconComp : null}
      </button>
    </div>
  );
});

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  iconSide: PropTypes.oneOf(['left', 'right']),
  focusColor: PropTypes.string,
  // For ListView navigation
  onFocusChange: PropTypes.func,
  index: PropTypes.number,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Button.defaultProps = {
  icon: null,
  iconSide: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
    {context => (
      <Button softKeyManager={context} forwardedRef={ref} {...props} />
    )}
  </SoftKeyConsumer>
));
