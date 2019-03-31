import React, { Component } from 'react';
import 'normalize.css';
import './App.css';

import {MetroMap} from './components/map/MetroMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MetroMap />
      </div>
    );
  }
}

export default App;
