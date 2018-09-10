import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  initializeUserListings,
  updateUserListings
} from "./../../redux/reducer";

// Import Components
import Listing from "../Listing/Listing";

// Import Styles
import "../UserListings/UserListings.css";

class UserListings extends Component {
  componentDidMount() {
    this.getListings();
  }

  getListings() {
    console.log("Getting User Listings...");
    axios.get(`/api/listings/${this.props.user_id}`).then(response => {
      this.props.initializeUserListings(response.data);
    });
  }

  render() {
    if (this.props.userListings.length > 0) {
      return (
        <div className="user-listings">
          <div className="user-listings__container">
            <h2 className="user-listings__headline">My Vehicle Listings:</h2>
            {this.props.userListings.map(e => {
              return (
                <Listing
                  listing={e}
                  key={e.id}
                  showEdit={true}
                  showContact={false}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="user-listings">
          <h2 className="user-listings__headline">No Listings to display</h2>
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { initializeUserListings, updateUserListings },
    dispatch
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListings);
