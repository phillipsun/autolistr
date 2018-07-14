import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllListings, initializeUser } from './../../redux/reducer';

// Import Components
import Listing from '../Listing/Listing';

// Import Styles
import '../Dashboard/Dashboard.css'

class Dashboard extends Component {
  componentWillMount() {
    axios.get('/profile')
      .then(response => {
        this.props.initializeUser(response.data);
      });
    axios.get('/api/listings')
      .then(response => {
        //console.log(response.data);
        this.props.fetchAllListings(response.data);
      });
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='dashboard__listing-container'>
          <h1 className='dashboard__greeting'>Welcome back, {this.props.name}</h1>
          <h2 className='dashboard__headline'>Recently Posted Vehicle Listings:</h2>
          {this.props.listings.map(el => {
            return <Listing vehicle={el} key={el.id} />
          })}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { fetchAllListings, initializeUser }, dispatch )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);