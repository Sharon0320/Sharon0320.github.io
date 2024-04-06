import React, { useState, useRef } from 'react';
import './ReactionSpeedTest.css';

function ReactionSpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);

  const startTest = () => {
    if (isTestRunning) return; // If test is already running, ignore the click
    const delay = Math.floor(Math.random() * 4000) + 500; // Random time (500ms ~ 4500ms)
    setIsTestRunning(true);

    timeoutRef.current = setTimeout(() => {
      setReactionTime(null);
      document.getElementById('testArea').style.backgroundColor = 'green'; // Change to green
      const start = Date.now(); // Record start time

      // Record click time after changing to green
      document.getElementById('testArea').onmousedown = () => {
        if (document.getElementById('testArea').style.backgroundColor !== 'green') {
          alert("Please wait for the box to turn green before pressing!");
        } else {
          const end = Date.now(); // Record click time
          const newReactionTime = (end - start) / 1000; // Calculate reaction time
          setReactionTime(newReactionTime); // No need toFixed(), it's for displaying
          document.getElementById('testArea').style.backgroundColor = 'red'; // Reset to red
          setIsTestRunning(false);
          document.getElementById('testArea').onmousedown = null; // Remove click event
        }
      };
    }, delay); // Delay before execution
  };

  const handleClick = () => {
    if (isTestRunning && document.getElementById('testArea').style.backgroundColor !== 'green') {
      alert("Please wait for the box to turn green before pressing!");
      resetTest();
    }
  };

  const resetTest = () => {
    clearTimeout(timeoutRef.current); // Clear the timeout if it's running
    setIsTestRunning(false);
    setReactionTime(null);
    document.getElementById('testArea').style.backgroundColor = 'red'; // Reset to initial color
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <div id="testArea" className='testArea' onMouseDown={handleClick}>
        {!isTestRunning ? (
          <button className="start_btn" onClick={startTest} style={{ color: 'black' }}>Start</button>
        ) : (
          <div>
            <h2 style={{fontSize:40}}>Reaction Speed Test</h2>
            <h1 style={{fontSize:60}}>Press when it turns green</h1>
          </div>
        )}
      </div>
      {reactionTime !== null && (
        <p style={{fontSize:60}}>
          Reaction time: {Math.round(reactionTime * 1000)} ms<br />
          {reactionTime.toFixed(3) !== null ? reactionTime.toFixed(3) + " seconds" : ""}
        </p>
      )}
    </div>
  );
}

export default ReactionSpeedTest;
