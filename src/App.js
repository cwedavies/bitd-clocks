import React, { Component } from 'react';
import './App.css';

import ClockFace from './clock/ClockFace.js';
import Paper from './clock/Paper.js';
import Tick from './clock/Tick.js';

import TextArea from './TextArea';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="clock">
          <svg style={{ position: 'absolute', top: 0, left: 0 }} width="400" viewBox="0 0 400 400">
            <Paper>
              <ClockFace />
              <Tick x="80" y="296" rotation="74" />
              <Tick x="170" y="300" rotation="178" />
              <Tick x="260" y="272" rotation="2" />
            </Paper>
          </svg>
          <div className="clock-text-area-wrapper">
            <TextArea className="clock-text-area" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
