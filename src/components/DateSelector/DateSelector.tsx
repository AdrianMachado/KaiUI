import React from 'react';
import ReactDOM from 'react-dom';

import './DateSelector.scss';
import SoftKey from '../SoftKey/SoftKey';
import TriColListView from '../../views/TriColumnListView/TriColumnListView';
import BodyTextListItem from '../BodyTextListItem/BodyTextListItem';
import { getDaysInMonth } from '../../utils/dates';

interface LocalProps {
  onOK: (res?: Date|null) => void;
  onCancel: () => void;
  header: React.ElementType | string | undefined;
  inputOptions: any;
  minDate: Date;
  maxDate: Date;
  initialDate: Date;
}

const Months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  June: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}

interface DateSelectorEvents {
  close: () => void;
}
type Props = LocalProps & DateSelectorEvents;

interface LocalState {
  isLoading: boolean;
  years: number[],
  months: string[],
  days: number[],
  selectedMonth: number;
  selectedDay: number;
  selectedYear: number;
}

class DateSelector extends React.Component<Props, LocalState> {
    private input: HTMLInputElement | null = null

  constructor(props: Props){
    super(props);

    this.state = {
      isLoading: true,
      years: [],
      days: [],
      months: [],
      selectedMonth: -1,
      selectedDay: -1,
      selectedYear: -1
    }
  }

  componentDidMount() {
    const minYear = this.props.minDate.getFullYear();
    const maxYear = this.props.maxDate.getFullYear();

    const years: number[] = [];
    for(let i = minYear; i <= maxYear; i++){
      years.push(i);
    }

    const minDay = 1;
    const maxDay = getDaysInMonth(this.props.initialDate.getMonth(), this.props.initialDate.getFullYear());
    const days: number[] = [];
    for(let i = minDay; i <= maxDay; i++){
      days.push(i);
    }

    const months = Object.keys(Months);

    this.setState({
      years, 
      months,
      days,
      selectedDay: this.props.initialDate.getDate(),
      selectedMonth: this.props.initialDate.getMonth(),
      selectedYear: this.props.initialDate.getFullYear(),
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
        onOK && onOK(this.calcSelectedDate());
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
          className="kai-datesel-wrapper"
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
        >
          {header ? <div className="kai-datesel-header h1">{header}</div> : null}
          <div className={`kai-datesel-container`}>
            <div className="kai-datesel-content">
              <TriColListView 
                col1Children={this.state.years.map((item) => (<BodyTextListItem header={item.toString()} />))}
                col2Children={this.state.months.map((item) => (<BodyTextListItem header={item.toString()} />))}
                col3Children={this.state.days.map((item) => (<BodyTextListItem header={item.toString()} />))}
                onCol1ChangeIndex={(index) => this.setYear(index)}
                onCol2ChangeIndex={(index) => this.setMonth(index)}
                onCol3ChangeIndex={(index) => this.setDay(index)}
                selectedCol1Index={this.state.years.indexOf(this.props.initialDate.getFullYear())}
                selectedCol2Index={this.props.initialDate.getMonth()}
                selectedCol3Index={this.state.days.indexOf(this.props.initialDate.getDate())} />
            </div>
          </div>
        </div>
        <SoftKey
            leftText={"Cancel"}
            leftCallback={() => { this.closeWindow(); }}
            rightText={"Select"}
            rightCallback={() => { onOK(this.calcSelectedDate()); this.closeWindow(); }}
          />
      </div>
    );
  }

  calcSelectedDate(): Date {
    return new Date(this.state.selectedYear, this.state.selectedMonth, this.state.selectedDay);
  }

  setYear(index: number){
    this.setState({
      selectedYear: this.state.years[index]
    });
    this.resetDaysForNewMonthYear();
  }

  setMonth(index: number){
    this.setState({
      selectedMonth: index + 1
    });
    this.resetDaysForNewMonthYear();
  }
  
  setDay(index: number){
    this.setState({
      selectedDay: this.state.days[index]
    });
  }

  resetDaysForNewMonthYear(){
    const minDay = 1;
    const maxDay = getDaysInMonth(this.state.selectedMonth, this.state.selectedYear);
    const days: number[] = [];
    for(let i = minDay; i <= maxDay; i++){
      days.push(i);
    }

    this.setState({days: days});
  }
}

function showDateSelctor(config: LocalProps) {
  const div = document.createElement('div');
  div.className = 'kai-datesel';
  document.body.appendChild(div);

  function render(props) {
    ReactDOM.render(<DateSelector {...props} />, div);
  }

  function closeWindow() {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  render({ ...config, close: closeWindow });
}


export {showDateSelctor};
export default DateSelector;