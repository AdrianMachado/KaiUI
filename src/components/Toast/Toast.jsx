import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import './Toast.scss';

const prefixCls = 'kai-toast';

const Toast = React.memo(
  props => {
    const {
      message,
      timeout,
      index,
      onDismiss,
      forwardedRef
    } = props;

    const itemCls = `${prefixCls}`;
    const messageCls = `${prefixCls}-message`;

    console.log("I'm a TOAST");
    useEffect(
      () => {
        console.log("Start timeout");
        const timer = setTimeout(
            () => {
              console.log("Dismiss toast with index: " + index);
              onDismiss(index);
            }, timeout
        );

        return () => {
          console.log("Clear timeout for timer.");
          clearTimeout(timer);
        }
      },
      [index, onDismiss, timeout]
    );

    return (
      <div className={itemCls} ref={forwardedRef}>
        <span className={messageCls}>{message}</span>
      </div>
    );
  }
);

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  index: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Toast.defaultProps = {
  number: 1000
};

export default React.forwardRef((props, ref) => (
  <Toast forwardedRef={ref} {...props} />
));