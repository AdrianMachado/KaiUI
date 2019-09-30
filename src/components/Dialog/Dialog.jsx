import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {requireOneOf } from '../../utils';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';

const prefixCls = 'kai-dialog';

const Dialog = React.memo(
  ({
    title,
    message,
    cancelable,
    positivBtn,
    negativeBtn,
    neutralBtn,
//    onOpen,
    onClose,
    onCancel,
    onDismiss,
    onApprove,
    children,
    forwardedRef,
    softKeyManager
  }) => {

    const itemCls = `${prefixCls}`;
    const containerCls = `${itemCls}-container`;
    const headerCls = `${itemCls}-header`;
    const contentCls = `${itemCls}-content`;
    const textContentCls = `${contentCls}-text`;

    useEffect(
      () => {
        const dismiss = onDismiss !== null ?
          () => {
            onDismiss();
            onClose();
          } : null;
    
        const approve = onApprove !== null ?
          () => {
            onApprove();
            onClose();
          } : null;
        
        const cancel = cancelable && onCancel !== null ?
          () => {
            onCancel();
            onClose();
          } : null;

        softKeyManager.setSoftKeyTexts({
          leftText: onDismiss && negativeBtn,
          centerText: positivBtn,
          rightText: cancelable && neutralBtn
        });

        softKeyManager.setSoftKeyCallbacks({
          leftCallback: dismiss,
          centerCallback: approve,
          rightCallback: cancel,
        });

        return () => {
          softKeyManager.unregisterSoftKeys();
        };
      }, []
    );

    const renderChildren = () => {
      if(message !== null) {
        return (
          <div className={textContentCls}>{message}</div>
        );
      } else {
        return React.Children.map(
          children, (child, index) => {
            const newRef = React.createRef();

            return React.cloneElement(child, {
              index,
              ref: newRef
            });
        });
      }
    };

    return (
      <div className={itemCls} ref={forwardedRef}>
        <div className={containerCls}>
          <label className={headerCls}>{title}</label>
          <div className={contentCls}>
            { renderChildren() }
          </div>
        </div>
      </div>
    );
  }
);

const requireContent = requireOneOf({
  text: PropTypes.string,
  children: PropTypes.array,
});

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: requireContent,
  cancelable: PropTypes.bool,
  positivBtn: PropTypes.string,
  negativeBtn: PropTypes.string,
  neutralBtn: PropTypes.string,
//  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onDismiss: PropTypes.func,
  onApprove: PropTypes.func,
  children: requireContent,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ])
};

Dialog.defaultProps = {
  cancelable: true,
  positivBtn: 'Ok',
  negativeBtn: 'No',
  neutralBtn: 'Cancel',
//  onOpen: null,
  onClose: null,
  onCancel: null,
  onDismiss: null,
  onApprove: null
};

export default React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
    {context => (
      <Dialog
        softKeyManager={context}
        forwardedRef={ref}
        {...props}
      />
    )}
  </SoftKeyConsumer>
));

export const showDialog = props => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const render = props => {
    ReactDOM.render(<Dialog {...props} />, container);
  };

  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    props.onClose && props.onClose();
  };

  props.onOpen && props.onOpen();
  render({ ...props, close });
};