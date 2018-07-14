import React, { Component } from 'react';

// Import Components
import routes from './routes'
import Nav from './component/Nav/Nav';

// Import Styles
import './App.css';
import './resets.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
