import React, { Component } from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../redux/reducer";

// Import Styles
import "../Nav/Nav.css";

// Import Assets
import logo from "./../../assets/ALR.png";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount = () => {
    console.log(this.props.location.pathname);
    console.log(this.props.location);
  };

  logoutHandler() {
    axios.post("/api/logout").then(res => this.props.logout());
  }

  render() {
    if (this.props.location.pathname !== "/") {
      let id = this.props.user_id;
      return (
        <div className="nav">
          <div className="nav__logo-container">
            <img className="nav__logo" src={logo} alt="nav logo" />
          </div>
          <div className="nav__links">
            <Link className="nav__home" to="/dashboard">
              Home
            </Link>
            <Link className="nav__user-listings" to={`/listings/${id}`}>
              My Listings
            </Link>
            <Link className="nav__sell-link" to="/listing/new">
              Sell
            </Link>
            <Link
              className="nav__logout-link"
              to="/"
              onClick={this.logoutHandler}
            >
              Logout
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav">
          <div className="nav__logo-container">
            <img className="nav__logo" src={logo} alt="nav logo" />
          </div>
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
);
