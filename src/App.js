import React, { Component } from 'react';
import './App.css';

import _ from 'lodash/fp';

import Clock from './components/Clock';

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
        <section className="clocks">
          {
            _.map(
              (clock, idx) => <Clock key={idx} {...clock} />,
              clocks
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
