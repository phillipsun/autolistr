import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteListing } from './../../redux/reducer';

// Import Styles
import '../Listing/Listing.css'

class Listing extends Component {

  deleteListing(id) {
    axios.delete(`/api/listing/${id}`)
      .then(response => {
        console.log("deleting");
        this.props.deleteListing(id);
      });
    
  }

  render() {
    console.log(this.props.vehicle);
    let { id, make, model, year, mileage, img, description, user_id, price, vin } = this.props.vehicle;
    return (
      
      <div className='listing'>
        <div className='listing__img-box'>
          <img src={img} className='listing__img' alt={`vehicle ${id}`}/>
        </div>
        <Link className='listing__heading-title' to={`/listing/${id}`}>
          <h2>
            <span>{year} </span>
            <span>{make} </span>
            <span>{model}</span>
          </h2>
        </Link>
        <div className='listing__desc-box'>
          <h2>Vehicle Info:</h2>
          <p className='listing__price'>Price: ${price}</p>
          <p className='listing__mileage'>Mileage: {mileage} miles</p>
        </div>
        {this.props.showContact ? <div className='listing__contact'>
          <p>Posted by: {user_id}</p>
          <button>Contact Seller!</button>
        </div> : null}
        {this.props.canEdit ? <Link to={`/listing/${id}/edit`}>Edit</Link> : null}
        {this.props.delete ? <a className='listing__delete-btn' onClick={() => this.deleteListing(id)}>Delete</a> : null} 
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { deleteListing }, dispatch )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);