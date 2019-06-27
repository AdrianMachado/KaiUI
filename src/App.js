import React from 'react'
import Header from './components/Header/Header';
import SoftKey from './components/SoftKey/SoftKey';


function App () {
  const leftCallback = () => {
    console.log('left was pressed');
  }
  return (
    <div className="App">
      <Header text="rately"/>
      
      <footer>
        <SoftKey leftText="left" centerText="select" rightText="right" leftCallback={leftCallback}/>
      </footer>
    </div>
  )
}

export default App
