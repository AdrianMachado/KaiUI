import React from 'react';
import SoftKey from './SoftKey';

interface LocalProps {
  className?:string
}

interface LocalState {
  leftText: string | null,
  centerText: string | null,
  rightText: string | null,
  centerIcon: any | null,
  leftIcon: any | null,
  rightIcon: any | null,
  leftCallback?: () => void,
  centerCallback: () => void,
  rightCallback: () => void,
}

export const SoftKeyContext = React.createContext<SoftKeyContextProps|undefined>(undefined);
export interface SoftKeyContextProps {
  setLeftCallback: (leftCallback: () => void) => void,
  setRightCallback: (rightCallback: () => void) => void,
  setCenterCallback: (centerCallback: () => void) => void,
  setLeftText: (leftText: any) => void,
  setRightText: (rightText: any) => void,
  setCenterText: (centerText: any) => void,
  setLeftIcon: (leftIcon: any) => void,
  setCenterIcon: (centerIcon: any) => void,
  setRightIcon: (rightIcon: any) => void,
  setSoftKeyTexts: ({ leftText, centerText, rightText }: {
      leftText?: string | undefined;
      centerText?: string | undefined;
      rightText?: string | undefined;
  }) => void,
  setSoftKeyCallbacks: ({ leftCallback, centerCallback, rightCallback, }: {
    leftCallback?: (() => void) | undefined;
    centerCallback?: (() => void) | undefined;
    rightCallback?: (() => void) | undefined;
}) => void,
  unregisterSoftKeys: () => void
}

export class SoftKeyProvider extends React.PureComponent<LocalProps, LocalState> {

  constructor(props: LocalProps){
    super(props);

    this.state = {
      leftText: '',
      centerText: '',
      rightText: '',
      centerIcon: null,
      leftIcon: null,
      rightIcon: null,
      leftCallback: () => {},
      centerCallback: () => {},
      rightCallback: () => {},
    };  
  }

  setLeftCallback = (leftCallback: () => void) => {
    this.setState({ leftCallback });
  };

  setRightCallback = (rightCallback: () => void) => {
    this.setState({ rightCallback });
  };

  setCenterCallback = (centerCallback: () => void) => {
    this.setState({ centerCallback });
  };

  setLeftText = leftText => {
    this.setState({ leftText, leftIcon: null });
  };

  setRightText = rightText => {
    this.setState({ rightText, rightIcon: null });
  };

  setCenterText = centerText => {
    this.setState({ centerText, centerIcon: null });
  };

  setCenterIcon = centerIcon => {
    this.setState({ centerIcon, centerText: null });
  };

  setLeftIcon = leftIcon => {
    this.setState({ leftIcon, leftText: null });
  };

  setRightIcon = rightIcon => {
    this.setState({ rightIcon, rightText: null });
  };

  // Shortcuts for convenience

  setSoftKeyTexts = ({ leftText = '', centerText = '', rightText = '' }) => {
    this.setState({ leftText, centerText, rightText });
  };

  setSoftKeyCallbacks = ({
    leftCallback = () => {},
    centerCallback = () => {},
    rightCallback = () => {},
  }) => {
    this.setState({ leftCallback, centerCallback, rightCallback });
  };

  unregisterSoftKeys = () => {
    this.setState({
      leftCallback: () => {},
      centerCallback: () => {},
      rightCallback: () => {},
      leftText: null,
      rightText: null,
      centerText: null,
      centerIcon: null,
    });
  };

  render() {
    const context: SoftKeyContextProps = {
      setLeftCallback: this.setLeftCallback,
      setRightCallback: this.setRightCallback,
      setCenterCallback: this.setCenterCallback,
      setLeftText: this.setLeftText,
      setRightText: this.setRightText,
      setCenterText: this.setCenterText,
      setLeftIcon: this.setLeftIcon,
      setCenterIcon: this.setCenterIcon,
      setRightIcon: this.setRightIcon,
      setSoftKeyTexts: this.setSoftKeyTexts,
      setSoftKeyCallbacks: this.setSoftKeyCallbacks,
      unregisterSoftKeys: this.unregisterSoftKeys
    };

    return (
      <SoftKeyContext.Provider value={context}>
        {this.props.children}
        <footer className={this.props.className || ''}>
          <SoftKey
            leftText={this.state.leftText}
            leftIcon={this.state.leftIcon}
            centerText={this.state.centerText}
            centerIcon={this.state.centerIcon}
            rightIcon={this.state.rightIcon}
            rightText={this.state.rightText}
            leftCallback={this.state.leftCallback}
            centerCallback={this.state.centerCallback}
            rightCallback={this.state.rightCallback}
          />
        </footer>
      </SoftKeyContext.Provider>
    );
  }
}
