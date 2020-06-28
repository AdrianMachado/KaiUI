import React, { useState } from 'react';
import Toast from '../components/Toast/Toast';

export interface ToastMessage {
    text: string;
    duration: number;
}
let isProcessingQueue = false;
const toastQueue: ToastMessage[] = [];

export interface ToastContextProps{
    showToast: (text, duration) => void,
}

const ToastContext = React.createContext<ToastContextProps|undefined>(undefined);

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
    if(toastData){
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

const withToast = (Component:any) => (props:any) => (
    <ToastContext.Consumer>
      {toastProps => <Component {...props} 
                        {...toastProps}
                    />}
    </ToastContext.Consumer>
  );
  

export default ToastContext;
export { ToastContextProvider, withToast };