import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './Button.scss';

const prefixCls = 'kai-button';

const PureButton = React.memo(props => {
  const {
    text,
    icon,
    iconSide,
    onClick,
    focusColor,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    name,
    type,
    onFocusChange,
    index,
    forwardedRef,
    softKeyManager,
    softKeyText,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocusChange = useCallback(
    isNowFocused => {
      setIsFocused(isNowFocused);
      if (isNowFocused) {
        const centerText = softKeyText;
        softKeyManager.setSoftKeyTexts({ centerText });
        softKeyManager.setSoftKeyCallbacks({
          centerCallback: onClick,
        });
        onFocusChange(index);
      } else {
        softKeyManager.unregisterSoftKeys();
      }
    },
    [index, onFocusChange, onClick, softKeyManager, softKeyText]
  );

  const buttonCls = prefixCls;
  const inputCls = `${prefixCls}-input`;
  const lineCls = `${prefixCls}-line ${
    iconSide === 'left' ? 'right' : iconSide === 'right' ? 'left' : ''
  }`;
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
        form={form}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formNoValidate={formNoValidate}
        formTarget={formTarget}
        name={name}
        type={type}
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

const Button = React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
    {context => (
      <PureButton softKeyManager={context} forwardedRef={ref} {...props} />
    )}
  </SoftKeyConsumer>
));

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  iconSide: PropTypes.oneOf(['left', 'right']),
  focusColor: PropTypes.string,
  // HTML Button props
  form: PropTypes.string,
  formAction: PropTypes.string,
  formEncType: PropTypes.oneOf([
    'application/x-www-form-urlencoded',
    'multipart/form-data',
    'text/plain',
  ]),
  formMethod: PropTypes.oneOf(['get', 'post']),
  formNoValidate: PropTypes.bool,
  formTarget: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  name: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  // For ListView navigation
  onFocusChange: PropTypes.func,
  index: PropTypes.number,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  // For softkey
  softKeyText: PropTypes.string,
};

Button.defaultProps = {
  icon: null,
  iconSide: null,
  focusColor: colors.defaultFocusColor,
  type: 'button',
  form: undefined,
  formAction: undefined,
  formEncType: undefined,
  formMethod: undefined,
  formNoValidate: undefined,
  formTarget: undefined,
  name: undefined,
  softKeyText: 'select',
};

export default Button
