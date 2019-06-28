import React from 'react';
import Header from './components/Header/Header';
import SoftKey from './components/SoftKey/SoftKey';
import TabView from './views/TabView/TabView';

function App() {
  const leftCallback = () => {
    console.log('left was pressed');
  };
  return (
    <div className="App">
      <Header text="rately" />
      <TabView tabLabels={['tab 1', 'tab2', 'parka', 'sweater']}>
        <div>Hello</div>
        <button>this is a button</button>
        <div>another view</div>
        <button>Do it</button>
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
