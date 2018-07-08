import React from 'react';

// Import Styles
import '../Nav/Nav.css'

function Listing() {

  return (
    <div className='nav'>
      <h1 className='nav__headline'>AutoLister</h1>
      <div className='nav__buttons'>
        <p className='nav__button'>Your Listings</p>
        <p className='nav__button'>Buy</p>
        <p className='nav__button'>Sell</p>
        <p className='nav__button'>Logout</p>
      </div>
    </div>
  )
}

export default Listing;