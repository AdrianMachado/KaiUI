import React from 'react';

interface LocalProps {
}
interface LocalState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<LocalProps,LocalState> {
    constructor(props: LocalProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error(error);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }
  
  export {ErrorBoundary};
  