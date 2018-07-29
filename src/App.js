import React, { Component } from 'react';
import './App.css';

import ClockView from './views/ClockView';

const clocks = [
  {
    caption: [
      'A New Life of Crime',
      '#Theoldlifewascrimetoo',
    ],
    size: 6,
    ticks: 2
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
