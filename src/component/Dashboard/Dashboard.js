import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initializeUser } from './../../redux/reducer';

// Import Components
import Listing from '../Listing/Listing';

// Import Styles
import '../Dashboard/Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userListings: [],
      listings: [],
      user_id: ''
    }
  }

  componentDidMount() {
    axios.get('/api/listings')
      .then(response => {
        console.log('GET response', response.data);
        this.setState({ listings: response.data })
      });
    axios.get('/profile')
      .then(response => {
        console.log('GET user info', response.data);
        this.props.initializeUser(response.data);
        console.log('Hello world', this.props);
      });
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='dashboard__listing-container'>
          <h1>Welcome back, {this.props.name}</h1>
          <h3>Recent Vehicle Listings:</h3>
          {this.state.listings.map(el => {
            return <Listing vehicle={el} key={el.id} />
          })}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { initializeUser }, dispatch )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);