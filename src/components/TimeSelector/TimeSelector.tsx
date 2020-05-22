import React from 'react';
import ReactDOM from 'react-dom';

import './TimeSelector.scss';
import SoftKey from '../SoftKey/SoftKey';
import TriColListView from '../../views/TriColumnListView/TriColumnListView';
import BodyTextListItem from '../BodyTextListItem/BodyTextListItem';

export interface Time {
  hour: number;
  minute: number;
  period: string
}

interface LocalProps {
  onOK: (res?: Time|null) => void;
  onCancel: () => void;
  header: React.ElementType | string | undefined;
  inputOptions: any;
  initialTime: Time;
} 

interface TimeSelectorEvents {
  close: () => void;
}
type Props = LocalProps & TimeSelectorEvents;

interface LocalState {
  isLoading: boolean;
  hours: number[],
  minutes: number[],
  periods: string[],
  selectedHour: number;
  selectedMinute: number;
  selectedPeriod: string;
}

class TimeSelector extends React.Component<Props, LocalState> {

  constructor(props: Props){
    super(props);

    this.state = {
      isLoading: true,
      hours: [],
      minutes: [],
      periods: [],
      selectedHour: -1,
      selectedMinute: -1,
      selectedPeriod: "AM"
    }
  }

  componentDidMount() {
    const hours: number[] = [...Array(12).keys()].slice(1);
    const minutes: number[] = [...Array(59).keys()];

    this.setState({
      hours, 
      minutes,
      periods: ["AM", "PM"],
      selectedHour: this.props.initialTime.hour,
      selectedMinute: this.props.initialTime.minute,
      selectedPeriod: this.props.initialTime.period,
      isLoading: false
    });
  }

  focusLast() {
  }

  focus() {
  }

  onKeyDown = e => {
    const { onOK, onCancel } = this.props;
    switch (e.key) {
      case 'SoftLeft':
        onCancel && onCancel();
        this.closeWindow();
        break;

      case 'Enter':
        onOK && onOK(this.calcSelectedTime());
        this.closeWindow();
        break;

      case 'Backspace':
        this.closeWindow();
        e.preventDefault();
        break;

      default:
        break;
    }
  };

  closeWindow() {
    this.props.close();
  }

  render() {
    if(this.state.isLoading){
      return (<div>Loading...</div>);
    }

    const { header, onOK } = this.props;
    return (
      <div className="systemContent">
        <div
          //ref={node => { this.el = node }}
          className="kai-timesel-wrapper"
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
        >
          {header ? <div className="kai-timesel-header h1">{header}</div> : null}
          <div className={`kai-timesel-container`}>
            <div className="kai-timesel-content">
              <TriColListView 
                col1Children={this.state.hours.map((item) => (<BodyTextListItem header={item.toString()} />))}
                col2Children={this.state.minutes.map((item) => (<BodyTextListItem header={item.toString()} />))}
                col3Children={this.state.periods.map((item) => (<BodyTextListItem header={item.toString()} />))}
                onCol1ChangeIndex={(index) => this.setHour(index)}
                onCol2ChangeIndex={(index) => this.setMinute(index)}
                onCol3ChangeIndex={(index) => this.setPeriod(index)}
                selectedCol1Index={this.props.initialTime.hour - 1}
                selectedCol2Index={this.props.initialTime.minute}
                selectedCol3Index={this.state.periods.indexOf(this.props.initialTime.period)} />
            </div>
          </div>
        </div>
        <SoftKey
            leftText={"Cancel"}
            leftCallback={() => { this.closeWindow(); }}
            rightText={"Select"}
            rightCallback={() => { onOK(this.calcSelectedTime()); this.closeWindow(); }}
          />
      </div>
    );
  }

  calcSelectedTime(): Time {
    return {
      hour: this.state.selectedHour,
      minute: this.state.selectedMinute,
      period: this.state.selectedPeriod
    };
  }

  setHour(index: number){
    this.setState({
      selectedHour: index + 1
    });
  }

  setMinute(index: number){
    this.setState({
      selectedMinute: index
    });
  }
  
  setPeriod(index: number){
    this.setState({
      selectedPeriod: this.state.periods[index]
    });
  }
}

function showTimeSelector(config: LocalProps) {
  const div = document.createElement('div');
  div.className = 'kai-timesel';
  document.body.appendChild(div);

  function render(props) {
    ReactDOM.render(<TimeSelector {...props} />, div);
  }

  function closeWindow() {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  render({ ...config, close: closeWindow });
}


export {showTimeSelector};
export default TimeSelector;