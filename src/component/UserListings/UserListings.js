import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initializeUserListings, updateUserListings } from './../../redux/reducer';

// Import Components
import Listing from '../Listing/Listing';

// Import Styles
import '../UserListings/UserListings.css'

class UserListing extends Component {
  constructor(props) {
    super(props);

    //this.grabListings = this.grabListings.bind(this);
  }

  componentWillMount() {
    this.grabListings();
  }

  grabListings() {
    console.log("grabbing listings");
    axios.get(`/api/listings/${this.props.user_id}`)
      .then(response => {
        console.log("From component", response.data);
        this.props.initializeUserListings(response.data);
      })
  }

  
  
  render() {
    if (this.props.userListings) {
      return (
        <div className='user-listings'>
          <div className='user-listings__container'>
            <h2 className='user-listings__headline'>My Vehicle Listings:</h2>
            {this.props.userListings.map( e => {
                console.log(this.props.userListings);
                return <Listing vehicle={e} key={e.id} delete={true} canEdit={true}/>
              })}
            </div>
        </div>
        )
    } else {
      return ( <div className='user-listings'><h2>No Listings to display</h2></div> )
    }
  }



}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { initializeUserListings, updateUserListings }, dispatch )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);