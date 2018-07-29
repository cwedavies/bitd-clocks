import React, { Component } from 'react';
import './App.css';

import ClockControls from './components/ClockControls';
import ClockView from './views/ClockView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ClockView />
        <ClockControls />
      </div>
    );
  }
}

export default App;
