import React, { Component } from 'react';
import './App.css';

import ClockView from './views/ClockView';

const clocks = [
  {
    caption: [
      'Run!',
      'Escape the Bluecoats'
    ],
    size: 6,
    ticks: 5
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <ClockView clocks={clocks} />
      </div>
    );
  }
}

export default App;
