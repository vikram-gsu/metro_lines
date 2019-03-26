import React, { Component } from 'react';
import 'normalize.css';
import './App.css';

import {PopupMarker} from './components/map/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PopupMarker />
      </div>
    );
  }
}

export default App;
