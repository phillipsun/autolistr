import React, { Component } from 'react';

// Import Components
import routes from './routes'
import Nav from './component/Nav/Nav';

// Import Styles
import './App.css';

class App extends Component {

  // componentWillMount() {
  //   axios.get('/profile')
  //     .then(response => {
  //       console.log('GET user info', response.data);
  //       this.setState({ user: response.data })
  //     });

  // }
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
