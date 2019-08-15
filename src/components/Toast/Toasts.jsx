import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Toasts = props => {
  const {
    containerId,
    onDismiss,
    children,
  } = props;

  console.log("Toast collection!");

  const element = document.createElement('div');

  useEffect(
    () => {
      const container = document.getElementById(containerId);
      container.append(element);

      return () => container.removeChild(element);
    }, [element, containerId]
  );

  return React.Children.map(
    children, (child, id) => {
      const newRef = React.createRef();
      // return ReactDOM.createPortal(
        return React.cloneElement(child, {
            ref: newRef,
            index: id,
            onDismiss: onDismiss
         });
        //), element)
    }
  );
};

Toasts.propTypes = {
  containerId: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.array,
};

Toasts.defaultProps = {
  containerId: 'toasts',
};

export default Toasts;