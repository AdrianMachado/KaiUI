import React from 'react';
import Header from './components/Header/Header';
import SoftKey from './components/SoftKey/SoftKey';
import TabView from './views/TabView/TabView';
import ListView from './views/ListView/ListView';
import CheckboxListItem from './components/CheckboxListItem/CheckboxListItem';
import IconListItem from './components/IconListItem/IconListItem';
import TextListItem from './components/TextListItem/TextListItem';
import BodyTextListItem from './components/BodyTextListItem/BodyTextListItem';
import ArrowListItem from './components/ArrowListItem/ArrowListItem';

function App() {
  const leftCallback = () => {
    console.log('left was pressed');
  };
  let cbVal = false;
  const handleInputChange = newVal => {
    console.log('new input value', newVal);
  };

  return (
    <div className="App">
      <Header text="rately" />
      <TabView tabLabels={['checkboxes', 'icons', '3 Text', 'body-arr']}>
        <ListView>
          <CheckboxListItem
            primary="Hello primary text"
            secondary="seconday text"
            initCheckboxVal={false}
            onInputChange={() => {}}
            checkboxSide="left"
          />
          <CheckboxListItem
            primary="Another item with more text"
            secondary="seconday text at the bottom"
            initCheckboxVal={true}
            onInputChange={() => {}}
            checkboxSide="right"
          />
          <CheckboxListItem
            primary="Item without secondary"
            initCheckboxVal={false}
            isChecked={cbVal}
            onInputChange={handleInputChange}
            checkboxSide="right"
          />
          <CheckboxListItem
            primary="Another item to force a scroll"
            secondary="How lovely!"
            initCheckboxVal={true}
            isChecked={cbVal}
            onInputChange={handleInputChange}
            checkboxSide="left"
          />
        </ListView>
        <ListView>
          <IconListItem
            primary="Hello primary text"
            secondary="seconday text"
            icon="kai-icon-favorite-off"
          />
          <IconListItem
            primary="Another item with more text"
            secondary="seconday text at the bottom"
            icon="kai-icon-favorite-on"
          />
          <IconListItem primary="Item without secondary" icon="kai-icon-wifi" />
          <IconListItem primary="Last item" icon="kai-icon-camera" />
        </ListView>
        <ListView>
          <TextListItem
            primary="Hello primary text"
            secondary="secondary text"
            tertiary="tertiary text"
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
          <ArrowListItem primary="Primary text" secondary="Secondary text" />
          <ArrowListItem primary="Just me and arrow" />
        </ListView>
      </TabView>
      <footer>
        <SoftKey
          leftText="left"
          centerText="select"
          rightText="right"
          leftCallback={leftCallback}
        />
      </footer>
    </div>
  );
}

export default App;
