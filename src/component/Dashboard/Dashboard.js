import React, { Component } from 'react';
import axios from 'axios';

// Import Components
import Listing from '../Listing/Listing';

// Import Styles
import '../Dashboard/Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      user: {}
    }
  }

  componentDidMount() {
    axios.get('/api/listings')
      .then(response => {
        console.log('GET response', response.data);
        this.setState({ vehicles: response.data })
      });

    axios.get('/profile')
      .then(response => {
        console.log('GET user info', response.data);
        this.setState({ user: response.data })
      });
  }

  render() {
    return (
      <div className='dashboard'>
        <h2>Welcome back, {this.state.user.name}</h2>
        <div className='dashboard__listing-container'>
          <h3>Recent Vehicle Listings:</h3>
          {this.state.vehicles.map(el => {
            return <Listing vehicle={el} key={el.id} />
          })}
        </div>
      </div>
    )
  }
}

export default Dashboard;