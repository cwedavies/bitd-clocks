import React, { Component } from 'react';
import './App.css';

import ClockView from './views/ClockView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ClockView />
      </div>
    );
  }
}

export default App;
