import React, { Component } from 'react';

// Import Styles
import '../Listing/Listing.css'

class Listing extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let { id, make, model, year, mileage, img, description, author_id, price } = this.props.vehicle;

    return (
      <div className='vehicle__listing'>
        <div className='vehicle__img-box'>
          <img src={img} className='vehicle__img' alt={`vehicle ${id}`}/>
        </div>
        <h2 className='vehicle__heading-title'>
          <span>{year} </span>
          <span>{make} </span>
          <span>{model}</span>
        </h2>
        <div className='vehicle__desc-box'>
          <h3>Price: ${price}</h3>
          <h4 className='vehicle__mileage'>Mileage: {mileage} miles</h4>
          <p className='vehicle__desc'>Description: {description}</p>
        </div>
        <div className='vehicle__contact'>
          <button className='vehicle__contact-btn'>Contact Seller!</button>
          <p>Posted by: {author_id}</p>
        </div>
      </div>
    )
  }
}

export default Listing;