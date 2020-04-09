import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import { useFocus } from '../../hooks';
import './Button.scss';

const prefixCls = 'kai-button';

const Button = React.memo(props => {
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
    forwardedRef,
    softKeyManager,
    softKeyText,
    softKeyIcon,
  } = props;

  const handleFocusChange = useCallback(
    isNowFocused => {
      if (isNowFocused) {
        if (softKeyIcon != null) {
          softKeyManager.setCenterIcon(softKeyIcon);
        } else {
          softKeyManager.setSoftKeyTexts({ centerText: softKeyText });
        }

        softKeyManager.setSoftKeyCallbacks({
          centerCallback: onClick,
        });
        onFocusChange(index);
      } else {
        softKeyManager.unregisterSoftKeys();
      }
    },
    [index, onFocusChange, onClick, softKeyManager, softKeyText, softKeyIcon]
  );

  const isFocused = useFocus(forwardedRef, handleFocusChange, false);

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
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  // For softkey
  softKeyText: PropTypes.string,
  softKeyIcon: PropTypes.string,
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
  softKeyIcon: null,
};

export default React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
    {context => (
      <Button softKeyManager={context} forwardedRef={ref} {...props} />
    )}
  </SoftKeyConsumer>
));
