import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { clear, setListingInfo } from './../../redux/reducer';

// Import Styles
import '../Form/Form.css'

class Form extends Component {
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
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(prop, value) {
    this.setState({ [prop]: value })
  }

  handleCreate() {
    let { user_id } = this.props;
    let listing = { ...this.state, user_id };
    console.log(listing);
    axios.post('/api/listing/new', listing)
      .then(response => {
        this.props.clear();
        this.props.history.push('/Dashboard')
      });
  }

  render() {
    return (
      <div className='form'>
        <h1 className='form__headline'>List a vehicle for sale</h1>
        <div className='form__field-container'>
          <div className='form__input-container'>
            <p>Make: </p><input value={this.state.make} onChange={e => this.handleChange('make', e.target.value)} />
          </div>
          <div className='form__input-container'>
            <p>Model: </p><input value={this.state.model} onChange={e => this.handleChange('model', e.target.value)} />
          </div>
          <div className='form__input-container'>
            <p>Year: </p><input value={this.state.year} onChange={e => this.handleChange('year', e.target.value)} />
          </div>
          <div className='form__input-container'>
            <p>Mileage: </p><input value={this.state.mileage} onChange={e => this.handleChange('mileage', e.target.value)} />
          </div>
          <div className='form__input-container'>
            <p>ImgUrl: </p><input value={this.state.img} onChange={e => this.handleChange('img', e.target.value)} />
          </div>
          <div className='form__input-container'>
            <p>Description: </p><input value={this.state.description} onChange={e => this.handleChange('description', e.target.value)} />
          </div>
          <div className='form__input-container'>
            <p>Price: </p><input value={this.state.price} onChange={e => this.handleChange('price', e.target.value)} />
          </div>
          <div className='form__input-container'>
            <p>VIN: </p><input value={this.state.vin} onChange={e => this.handleChange('vin', e.target.value)} />
          </div>
        </div>
        <div className='form__btn-container'>
          <button className="form__create-btn" onClick={ () => {
            this.props.setListingInfo(this.state);
            this.handleCreate();
          }}>Create Listing</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  let { make, model, year, mileage, img, description, price, vin, user_id, email, name } = reduxState;
  return { make, model, year, mileage, img, description, price, vin, user_id, email, name };
}

export default connect(mapStateToProps, { clear, setListingInfo })(Form);