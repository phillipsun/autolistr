import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { updateListing } from './../../redux/reducer';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Styles
import '../UpdateListing/UpdateListing.css'


class UpdateListing extends Component {
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
      vin: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`api/listing/${id}`)
      .then(response => {
        this.setState({
          make: response.data[0].make, model: response.data[0].model, year: response.data[0].year, mileage: response.data[0].mileage, img: response.data[0].img, description: response.data[0].description, price: response.data[0].price, user_id: response.data[0].user_id, vin: response.data[0].vin
        })
      })
  }

  handleChange(prop, value) {
    this.setState({ [prop]: value })
  }

  updateListing() {
    let id = this.props.match.params.id;
    axios.put(`/api/listing/${id}`, this.state)
      .then(response => {
        console.log("From component", response.data[0]);
        <Redirect to="http://yahoo.com" />
      })
  }

  render() {

      return (
        <div className='update-listing'>
          <h2 className='update-listing__headline'>Update Listing</h2>
          <div className='update-listing__input-container'>
            <p>Make: </p><input value={this.state.make} onChange={e => this.handleChange('make', e.target.value)} />
          </div>
          <div className='update-listing__input-container'>
            <p>Model: </p><input value={this.state.model} onChange={e => this.handleChange('model', e.target.value)} />
          </div>
          <div className='update-listing__input-container'>
            <p>Year: </p><input value={this.state.year} onChange={e => this.handleChange('year', e.target.value)} />
          </div>
          <div className='update-listing__input-container'>
            <p>Mileage: </p><input value={this.state.mileage} onChange={e => this.handleChange('mileage', e.target.value)} />
          </div>
          <div className='update-listing__input-container'>
            <p>ImgUrl: </p><input value={this.state.img} onChange={e => this.handleChange('img', e.target.value)} />
          </div>
          <div className='update-listing__input-container'>
            <p>Description: </p><input value={this.state.description} onChange={e => this.handleChange('description', e.target.value)} />
          </div>
          <div className='update-listing__input-container'>
            <p>Price: </p><input value={this.state.price} onChange={e => this.handleChange('price', e.target.value)} />
          </div>
          <div className='update-listing__input-container'>
            <p>VIN: </p><input value={this.state.vin} onChange={e => this.handleChange('vin', e.target.value)} />
          </div>

          <button className='update-listing__btn' onClick={() => 
          {
            this.updateListing(this.state, this.props.match.params.id)
            this.props.history.push('/dashboard')
          }
          }>Update Listing</button>
        </div>
      )

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { updateListing }, dispatch )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateListing);