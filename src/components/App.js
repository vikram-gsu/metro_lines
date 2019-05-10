import React, { Component, lazy, Suspense } from 'react';
import 'normalize.css';
import './App.css';

const MetroMap = lazy(() => import('./MainMap/MetroMap'));

class App extends Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback = {<div>Loading...</div>}>
          <MetroMap />
        </Suspense>
      </div>
    );
  }
}

export default App;
