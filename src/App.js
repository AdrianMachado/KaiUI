import React, { useCallback } from 'react';
import Header from './components/Header/Header';
import { SoftKeyProvider } from './components/SoftKey/SoftKeyProvider';
import TabView from './views/TabView/TabView';
import ListView from './views/ListView/ListView';
import CheckboxListItem from './components/CheckboxListItem/CheckboxListItem';
import IconListItem from './components/IconListItem/IconListItem';
import TextListItem from './components/TextListItem/TextListItem';
import BodyTextListItem from './components/BodyTextListItem/BodyTextListItem';
import ArrowListItem from './components/ArrowListItem/ArrowListItem';
import RadioButtonListItem from './components/RadioButtonListItem/RadioButtonListItem';
import Separator from './components/Separator/Separator';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Slider from './components/Slider/Slider';
import Toasts from './components/Toast/Toasts';
import Toast from './components/Toast/Toast';
import './App.scss';
import colors from './theme/colors.scss';

function App() {
  const toasts = [];

  const handleInputChange = newVal => {
    console.log('new input value', newVal);
  };

  const handleDismiss = index => {
    console.log("Handle dismiss.");
    toasts.splice(index, 1);
  }

  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'Enter':
          const newToast = <Toast message="Button clicked!" timeout={1500} />;
          toasts.push(newToast);
          console.log(toasts);
          break;
        default:
          break;
      }
    },
    [toasts]
  );

  return (
    <div className="App">
      <div id="toasts"></div>
      <Header text="KaiUI" backgroundColor={colors.headerPurple} />
      <SoftKeyProvider>
        <div className="content">
          <Toasts containerId="toasts" onDismiss={handleDismiss}>
            {toasts}
          </Toasts>
          <TabView tabLabels={['CB Tab', 'Icon Tab', 'Txt Tab', 'Misc Tab']}>
            <ListView>
              <CheckboxListItem
                primary="Hello primary text"
                secondary="seconday text"
                initCheckboxVal={false}
                onInputChange={() => {}}
                checkboxSide="left"
              />
              <Separator separatorText={'hello, separator here'} />
              <CheckboxListItem
                primary="Another item with more text"
                secondary="secondary text at the bottom"
                initCheckboxVal={true}
                onInputChange={() => {}}
                checkboxSide="right"
                focusColor={colors.carrotOrange}
              />
              <RadioButtonListItem
                primary="Radio button"
                secondary="Secondary text"
                initButtonVal={false}
                onInputChange={handleInputChange}
                buttonSide="right"
              />
              <RadioButtonListItem
                primary="Another radio button"
                initButtonVal={true}
                onInputChange={handleInputChange}
                buttonSide="right"
              />
            </ListView>
            <div onKeyDown={handleKeyDown}>
              <ListView>
                <IconListItem
                  primary="List Item"
                  secondary="... with font icon"
                  icon="kai-icon-favorite-off"
                />
                <Slider
                  header="I am a slider"
                  initialValue={3}
                  minValue={0}
                  maxValue={10}
                />
                <Slider
                  header="Also a slider"
                  initialValue={5}
                  minValue={0}
                  maxValue={10}
                />
                <Separator separatorText={'Another separator'} />
                <IconListItem
                  primary="Item without secondary"
                  icon="kai-icon-wifi"
                />
                <IconListItem primary="Last item" icon="kai-icon-camera" />
              </ListView>
            </div>
            <ListView>
              <ProgressBar
                header={'Downloading...'}
                percentage={80}
                type={'download'}
                focusColor={colors.lime}
              />
              <ProgressBar
                header={'Downloading...'}
                percentage={30}
                type={'download'}
              />
              <TextListItem
                primary="Hello primary text"
                secondary="secondary text"
                tertiary="tertiary text"
                focusColor={colors.gold}
              />
              <ProgressBar
                header={'Buffering...'}
                percentage={30}
                type={'buffer'}
              />
              <ProgressBar
                header={'Buffering...'}
                percentage={70}
                type={'buffer'}
              />
              <TextListItem
                primary="Hello primary text"
                secondary="No tertiary here"
              />
              <TextListItem primary="Just primary" />
            </ListView>
            <ListView>
              <BodyTextListItem
                header="Header text"
                body="body text, can support a whole lot of text"
              />
              <BodyTextListItem header="Header text, but no body" />
              <ArrowListItem
                primary="Primary text"
                secondary="Secondary text"
              />
              <ArrowListItem primary="Just me and arrow" />
            </ListView>
          </TabView>
        </div>
      </SoftKeyProvider>
    </div>
  );
}

export default App;
