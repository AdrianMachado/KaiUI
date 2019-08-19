import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Toasts = React.memo(
  props => {
    const {
      containerId,
      onDismiss,
      children,
    } = props;

    const element = document.createElement('div');

    useEffect(
      () => {
        const container = document.getElementById(containerId);
        container.append(element);

        return () => container.removeChild(element);
      }, [element, containerId]
    );

    return ReactDOM.createPortal(
      React.Children.map(
        children, (child, index) => {
          const newRef = React.createRef();
          return React.cloneElement(child, {
              index,
              ref: newRef,
              onDismiss: onDismiss
            }
          );
        }
      ), element
    );
  }
);

Toasts.propTypes = {
  containerId: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.array,
};

Toasts.defaultProps = {
  containerId: 'toasts',
};

export default Toasts;

