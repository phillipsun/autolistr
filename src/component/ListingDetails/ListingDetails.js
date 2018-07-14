import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Styles
import '../ListingDetails/ListingDetails.css'


class ListingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      make: '',
      model: '',
      year: 0,
      mileage: 0,
      img: '',
      description: '',
      price: 0,
      vin: '',
      vinDetails: {}
    }

    this.getVINDetails = this.getVINDetails.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/api/listing/${id}`)
      .then(response => {
        console.log("From component", response.data[0]);
        this.setState({ make: response.data[0].make, model: response.data[0].model, year: response.data[0].year, mileage: response.data[0].mileage, img: response.data[0].img, description: response.data[0].description, price: response.data[0].price, user_id: response.data[0].user_id, vin: response.data[0].vin})
      })
  }

  getVINDetails() {
    let vin = this.state.vin;
    // Axios

    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`)
      .then(response => {
        this.setState({
          vinDetails: {
            plantCountry: response.data.Results[0].PlantCountry,
            make: response.data.Results[0].Make,
            modelYear: response.data.Results[0].ModelYear,
            bodyClass: response.data.Results[0].BodyClass,
            vehicleType: response.data.Results[0].VehicleType,
            engineHP: response.data.Results[0].EngineHP,
            trim: response.data.Results[0].Trim,
            bodyClass: response.data.Results[0].BodyClass
          }
        })
        // console.log(response.data.Results[0].PlantCountry)
        // console.log(response.data.Results[0].Make)
        // console.log(response.data.Results[0].ModelYear)
        // console.log(response.data.Results[0].BodyClass)
        // console.log(response.data.Results[0].VehicleType)
        // console.log(response.data.Results[0].EngineHP)
        // console.log(response.data.Results[0].Trim)
        // console.log(response.data.Results[0].BodyClass)
      })
  }

  render() {

      return (
        <div className='listing-details'>
          <div className='listing-details__img-box'>
            <img className='listing-details__img' src={this.state.img} alt={`${this.state.year} ${this.state.make} ${this.state.model} for sale`} />
          </div>
          <div className='listing-details__info-box'>
            <h2>Listing Details</h2>
            <p>Year: {this.state.year}</p>
            <p>Make: {this.state.make}</p>
            <p>Model: {this.state.model}</p>
            <p>Mileage: {this.state.mileage}</p>
            <p>VIN: {this.state.vin}</p>
            <h3>Price: {this.state.price}</h3>
            <p>Description:</p>
            <p>{this.state.description}</p>
          </div>
          <h4>If the VIN is provided, double check the listing information against the VIN information to confirm you are buying the right vehicle!</h4>
          <button onClick={() => this.getVINDetails(this.state.vin)}>Get VIN Details</button>
          {
            this.state.vinDetails.hasOwnProperty('make') ? 
              <div className='listing-details__vin-details'>
                <p>Plant Country: {this.state.vinDetails.plantCountry}</p>
                <p>Make: {this.state.vinDetails.make}</p>
                <p>Model Year: {this.state.vinDetails.modelYear}</p>
                <p>Body Class: {this.state.vinDetails.bodyClass}</p>
                <p>Vehicle Type: {this.state.vinDetails.vehicleType}</p>
                <p>EngineHP: {this.state.vinDetails.engineHP}</p>
                <p>Trim: {this.state.vinDetails.trim}</p>
                <p>Body Class: {this.state.vinDetails.bodyClass}</p>
              </div> 
            : null
          }
        </div>
      )

  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps, {})(ListingDetails));