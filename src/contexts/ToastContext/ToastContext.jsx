import React, { useState } from 'react';
import Toast from '../../components/Toast/Toast';

let isProcessingQueue = false;
const toastQueue = [];

const ToastContext = React.createContext({
  showToast: () => {},
});

const ToastContextProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(false);

  const processQueue = () => {
    if (toastQueue.length === 0) {
      isProcessingQueue = false;
      return;
    }
    isProcessingQueue = true;
    const toastData = toastQueue.shift();
    setText(toastData.text);
    setIsDisplayed(true)
    setTimeout(() => {
      setIsDisplayed(false);
      // Wait for the closing animation before processing next toast
      setTimeout(() => {
        processQueue();
      }, 300);
    }, toastData.duration || 5000)
  }
    
  const showToast = (text, duration) => {
    toastQueue.push({ text, duration });
    !isProcessingQueue && processQueue();
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast text={text} isDisplayed={isDisplayed} />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContext;
export { ToastContextProvider };
