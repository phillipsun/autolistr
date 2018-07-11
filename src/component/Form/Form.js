import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMake } from './../../redux/reducer';

// Import Styles

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
      price: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { make, model, year, mileage, img, description, price } = this.props;
    this.setState({ make, model, year, mileage, img, description, price });

  }

  handleChange(prop, value) {
    this.setState({ [prop]: value })
  }

  handleSubmit() {
    let { make, model, year, mileage, img, description, price } = this.props;
    let listing = { make, model, year, mileage, img, description, price };
    axios.post('/api/listing/new', listing)
      .then(res => {
        //this.props.clear();
        console.log(res);
        this.props.history.push('/')
      });
  }

  render() {
    return (
      <div class="form">
        <p>Make: </p><input onChange={e => this.handleChange('make', e.target.value)} />
        <p>Model: </p><input onChange={e => this.handleChange('model', e.target.value)} />
        <p>Year: </p><input onChange={e => this.handleChange('year', e.target.value)} />
        <p>Mileage: </p><input onChange={e => this.handleChange('mileage', e.target.value)} />
        <p>ImgUrl: </p><input  onChange={e => this.handleChange('img', e.target.value)} />
        <p>Description: </p><input onChange={e => this.handleChange('description', e.target.value)} />
        <p>Price: </p><input  onChange={e => this.handleChange('price', e.target.value)} />
        <div>
          <button className="wizard__button wizard__complete-button" onClick={ () => this.handleSubmit}>Create Listing</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  let { make, model, year, mileage, img, description, price } = reduxState;
  return { make, model, year, mileage, img, description, price };
}

export default connect(mapStateToProps, { updateMake })(Form);