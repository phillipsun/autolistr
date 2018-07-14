import React, { Component } from 'react';

// Import Styles
import './Auth.css'

// Import Assets
import logo from './../../assets/ALR.png';

class Auth extends Component {
  render() {
    return (
      <div className='auth'>
        <div className='auth__logo-container'><img className='auth__logo' src={logo} alt='home logo'/></div>
        <a className='auth__button' href='http://localhost:4000/login'>Login</a>
      </div>
    )
  }
}

export default Auth;