import React from 'react';
import { Link } from 'react-router-dom';


// Import Styles
import '../Nav/Nav.css'

function Listing() {

  return (
    <div className='nav'>
      <h1 className='nav__headline'>AutoLister</h1>
      <div className='nav__buttons'>
        <p className='nav__button'>Your Listings</p>
        <p className='nav__button'>Buy</p>
        <Link to='/listing/new'>Sell</Link>
        <Link to='/'>Logout</Link>
      </div>
    </div>
  )
}

export default Listing;