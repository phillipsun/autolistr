import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

// Import Styles
import "../ListingDetails/ListingDetails.css";

class ListingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      make: "",
      model: "",
      year: 0,
      mileage: 0,
      img: "",
      description: "",
      price: 0,
      user_id: null,
      vin: "",
      vinDetails: {}
    };

    this.getVINDetails = this.getVINDetails.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/api/listing/${id}`).then(response => {
      //console.log("From component", response.data[0]);
      this.setState({
        make: response.data[0].make,
        model: response.data[0].model,
        year: response.data[0].year,
        mileage: response.data[0].mileage,
        img: response.data[0].img,
        description: response.data[0].description,
        price: response.data[0].price,
        user_id: response.data[0].user_id,
        vin: response.data[0].vin
      });
    });
  }

  getVINDetails() {
    let vin = this.state.vin;
    // Axios Request to external api
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
      )
      .then(response => {
        this.setState({
          vinDetails: {
            plantCountry: response.data.Results[0].PlantCountry,
            make: response.data.Results[0].Make,
            modelYear: response.data.Results[0].ModelYear,
            bodyClass: response.data.Results[0].BodyClass,
            vehicleType: response.data.Results[0].VehicleType,
            engineHP: response.data.Results[0].EngineHP,
            trim: response.data.Results[0].Trim
          }
        });
      });
  }

  render() {
    const VINDetailsButton = this.state.vin ? (
      <button onClick={this.getVINDetails}>Get Additional Details</button>
    ) : null;
    return (
      <div className="listing-details">
        <Link
          className="listing__breadcrumbs"
          to={`/listings/${this.state.user_id}`}
        >
          Back to My Listings
        </Link>
        <div className="listing-details__img-box">
          <img
            className="listing-details__img"
            src={this.state.img}
            alt={`${this.state.year} ${this.state.make} ${
              this.state.model
            } for sale`}
          />
        </div>
        <div className="listing-details__info-box">
          <h1>Listing Details</h1>
          {this.state.year ? <p>Year: {this.state.year}</p> : null}
          {this.state.make ? <p>Make: {this.state.make}</p> : null}
          {this.state.model ? <p>Model: {this.state.model}</p> : null}
          {this.state.mileage ? <p>Mileage: {this.state.mileage}</p> : null}
          {this.state.vin ? <p>VIN: {this.state.vin}</p> : null}
          {this.state.price ? <p>Price: {this.state.price}</p> : null}
          {this.state.description ? (
            <p>Description: {this.state.description}</p>
          ) : null}
          {VINDetailsButton}
          {this.state.vinDetails.hasOwnProperty("make") ? (
            <div className="listing-details__vin-details">
              {this.state.vinDetails.plantCountry ? (
                <p>Plant Country: {this.state.vinDetails.plantCountry}</p>
              ) : null}
              {this.state.vinDetails.make ? (
                <p>Make: {this.state.vinDetails.make}</p>
              ) : null}
              {this.state.vinDetails.modelYear ? (
                <p>Model Year: {this.state.vinDetails.modelYear}</p>
              ) : null}
              {this.state.vinDetails.bodyClass ? (
                <p>Body Class: {this.state.vinDetails.bodyClass}</p>
              ) : null}
              {this.state.vinDetails.vehicleType ? (
                <p>Vehicle Type: {this.state.vinDetails.vehicleType}</p>
              ) : null}
              {this.state.vinDetails.engineHP ? (
                <p>
                  Horsepower: {this.state.vinDetails.engineHP}
                  HP
                </p>
              ) : null}
              {this.state.vinDetails.trim ? (
                <p>Trim: {this.state.vinDetails.trim}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(ListingDetails)
);
