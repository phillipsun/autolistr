import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListing } from "./../../redux/reducer";

// Import Styles
import "../Listing/Listing.css";

class Listing extends Component {
  deleteListing(id) {
    axios.delete(`/api/listing/${id}`).then(response => {
      this.props.deleteListing(id);
    });
  }

  render() {
    let {
      id,
      make,
      model,
      year,
      mileage,
      img,
      price,
      name,
      email
    } = this.props.listing;
    return (
      <div className="listing">
        <div className="listing__img-box">
          <img src={img} className="listing__img" alt={`vehicle ${id}`} />
        </div>
        <Link className="listing__heading-title" to={`/listing/${id}`}>
          <h2>
            <span className="year">{year} </span>
            <span className="make">{make} </span>
            <span className="model">{model}</span>
          </h2>
        </Link>
        <div className="listing__desc-box">
          <h2 className="listing__price">Price: ${price}</h2>
          <h2 className="listing__mileage">Mileage: {mileage} miles</h2>
        </div>
        {this.props.showContact ? (
          <div className="listing__contact">
            <p>Posted by: {name}</p>
            <p>Seller Email: {email}</p>
          </div>
        ) : null}
        {this.props.showEdit ? (
          <div class="listing__btns">
            <Link className="listing__edit-btn" to={`/listing/${id}/edit`}>
              Edit
            </Link>
            <a
              className="listing__delete-btn"
              onClick={() => this.deleteListing(id)}
            >
              Delete
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteListing }, dispatch);
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
