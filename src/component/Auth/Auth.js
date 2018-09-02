import React, { Component } from "react";

// Import Styles
import "./Auth.css";

class Auth extends Component {
  render() {
    return (
      <div className="auth">
        <a className="auth__button" href="http://localhost:4000/login">
          Login
        </a>
      </div>
    );
  }
}

export default Auth;
