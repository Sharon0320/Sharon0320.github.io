import React from 'react';
import './App.css';
import ReactionSpeedTest from './ReactionSpeedTest';

function App() {
  return (
    <div className="App">
      <h1>Checking Your Reaciton Time</h1>
      <h2>Press the button to start<br/>Click in green</h2>
      <p style={{ textAlign: 'center'}}>Start 버튼을 눌러 게임을 시작하세요.</p>
      <ReactionSpeedTest />
    </div>
  );
}

export default App;