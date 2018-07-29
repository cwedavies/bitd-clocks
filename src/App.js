import React, { Component } from 'react';
import './App.css';

import _ from 'lodash/fp';

import ClockView from './views/ClockView';

const clocks = [
  {
    caption: 'Bear\'s Stength',
    size: 6,
    ticks: 2
  },
  {
    caption: 'Escape from Bluecoats',
    size: 6,
    ticks: 4
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
