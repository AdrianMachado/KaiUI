import React from 'react';
import SoftKey from './SoftKey';

export const SoftKeyContext = React.createContext();

export class SoftKeyProvider extends React.PureComponent {
  state = {
    leftText: '',
    centerText: '',
    rightText: '',
    centerIcon: null,
    leftCallback: () => {},
    centerCallback: () => {},
    rightCallback: () => {},
  };

  setLeftCallback = leftCallback => {
    this.setState({ leftCallback });
  };

  setRightCallback = rightCallback => {
    this.setState({ rightCallback });
  };

  setCenterCallback = centerCallback => {
    this.setState({ centerCallback });
  };

  setLeftText = leftText => {
    this.setState({ leftText });
  };

  setRightText = rightText => {
    this.setState({ rightText });
  };

  setCenterText = centerText => {
    this.setState({ centerText, centerIcon: null });
  };

  setCenterIcon = centerIcon => {
    this.setState({ centerIcon, centerText: null });
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
    const context = {
      setLeftCallback: this.setLeftCallback,
      setRightCallback: this.setRightCallback,
      setCenterCallback: this.setCenterCallback,
      setLeftText: this.setLeftText,
      setRightText: this.setRightText,
      setCenterText: this.setCenterText,
      setCenterIcon: this.setCenterIcon,
      setSoftKeyTexts: this.setSoftKeyTexts,
      setSoftKeyCallbacks: this.setSoftKeyCallbacks,
      unregisterSoftKeys: this.unregisterSoftKeys,
    };

    return (
      <SoftKeyContext.Provider value={context}>
        {this.props.children}
        <footer>
          <SoftKey
            leftText={this.state.leftText}
            centerText={this.state.centerText}
            centerIcon={this.state.centerIcon}
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
