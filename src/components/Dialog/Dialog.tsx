import React from 'react';
import ReactDOM from 'react-dom';

import './Dialog.scss';
import SoftKey from '../SoftKey/SoftKey';

interface LocalProps {
  type: 'prompt' | 'confirm' | 'info',
  onOK: (res?: string|null) => void;
  onCancel: () => void;
  onClose: () => void;
  close: () => void;
  header: React.ElementType | string | undefined;
  content: React.ElementType | string | undefined;
  inputOptions: any;
}
type Props = LocalProps;

class Dialog extends React.Component<Props> {
    //private lastFocus: HTMLElement | null = null;
    //private el: HTMLDivElement | null = null;
    private input: HTMLInputElement | null = null;

  constructor(props: Props){
    super(props);
  }

  componentDidMount() {
    /*this.lastFocus = document.activeElement as HTMLElement;
    this.focus();*/
  }

  focusLast() {
    /*if (this.lastFocus && this.lastFocus.offsetParent) {
      this.lastFocus.focus();
    }
    this.lastFocus = null;*/
  }

  focus() {
    /*if (this.input) {
      this.input.focus();
    } else if(this.el) {
      this.el.focus();
    }*/
  }

  onKeyDown = e => {
    const { type, onOK, onCancel } = this.props;
    switch (e.key) {
      case 'SoftLeft':
        onCancel && onCancel();
        this.close();
        break;

      case 'Enter':
        let res: string|null = null;
        if (type === 'prompt' && this.input) {
          res = this.input.value;
        }
        onOK && onOK(res);
        this.close();
        break;

      case 'Backspace':
        this.close();
        e.preventDefault();
        break;

      default:
        break;
    }
  };

  close() {
    this.props.close();
    //this.focusLast();
  }

  render() {
    const { header, content, type, inputOptions, onOK, onClose, close } = this.props;
    return (
      <div className="systemContent">
        <div
          //ref={node => { this.el = node }}
          className="kai-dialog-wrapper"
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
        >
          {header ? <div className="kai-dialog-header h1">{header}</div> : null}
          <div className={`kai-dialog-container ${type}`}>
            {content ? <div className="kai-dialog-content">{content}</div> : null}
            {
              type === 'prompt' ?
                <input
                  ref={(node) => { this.input = node; }}
                  className="kai-dialog-input"
                  {...inputOptions}
                /> : null
            }
          </div>
        </div>
        <SoftKey
            leftText={"Cancel"}
            leftCallback={() => { close(); onClose(); }}
            rightText={type == "confirm" ? 
                        "Confirm" :
                        "OK" }
            rightCallback={() => { onOK(); close(); }}
          />
      </div>
    );
  }
}

function showDialog(config) {
  const div = document.createElement('div');
  div.className = 'kai-dialog';
  document.body.appendChild(div);

  function render(props) {
    ReactDOM.render(<Dialog {...props} />, div);
  }

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
    config.onClose && config.onClose();
  }

  config.onOpen && config.onOpen();
  render({ ...config, close });
}

function promptDialog(props){
    const config = {
        type: "prompt",
        ...props
    };
    return showDialog(config);
}

function confirmDialog(props){
    const config = {
        type: "confirm",
        ...props
    };
    return showDialog(config);
}


function infoDialog(props){
    const config = {
        type: "info",
        ...props
    };
    return showDialog(config);
}

export {promptDialog, infoDialog, confirmDialog};
export default Dialog;