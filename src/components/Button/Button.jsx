import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyContext } from '../SoftKey/SoftKeyProvider';
import './Button.scss';

const prefixCls = 'kai-button';

const Button = React.memo(
  React.forwardRef((props, ref) => {
    const {
      text,
      icon,
      iconSrc,
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
      softKeyText,
    } = props;

    const softKeyManager = useContext(SoftKeyContext);

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

    const renderedIcon = iconSrc === null ?
      <span className={icon} /> :
      <img src={iconSrc} alt="" />;

    const iconComp = (
      <div className={iconCls}>
        {renderedIcon}
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
          ref={ref}
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
  }
));

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconSrc: PropTypes.string,
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
  // For softkey
  softKeyText: PropTypes.string,
};

Button.defaultProps = {
  icon: null,
  iconSrc: null,
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
