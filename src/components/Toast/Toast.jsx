import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './Toast.scss';

const prefixCls = 'kai-toast';

const Toast = React.memo(
  props => {
    const {
      message,
      timeout,
      onDismiss,
      forwardedRef
    } = props;

    const [startTime] = useState(new Date().getMilliseconds());

    const itemCls = `${prefixCls}`;
    const messageCls = `${prefixCls}-message`;

    useEffect(
      () => {
        const millisElapsed = (new Date().getMilliseconds() - startTime);
        const remainingMillis = timeout - millisElapsed;

        if(remainingMillis > 0) {
          const timer = setTimeout(
              () => onDismiss(forwardedRef), remainingMillis
          );

          return () => clearTimeout(timer);
        }
      },
      [forwardedRef, onDismiss, timeout, startTime]
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
  onDismiss: PropTypes.func,
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