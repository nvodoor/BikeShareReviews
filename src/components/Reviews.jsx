import React from 'react';
import './reviews.css';


class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: 'San Francisco',
      cities: {
        'New York City': {
          'Latitude': 40.73935542,
          'Longitude': -73.99931783
        },
        'San Francisco': {
          'Latitude': 37.7449,
          'Longitude': -122.4194
        },
        'Seattle': {
          'Latitude': 47.6062,
          'Longitude': -122.3321
        },
        'Los Angeles': {
          'Latitude': 34.0522,
          'Longitude': -118.2437
        },
        'Portland': {
          'Latitude': 45.5122,
          'Longitude': -122.6587
        }
      },
      bike_shares: []
    }
    this.changeSelection = this.changeSelection.bind(this);
  }

  changeSelection(e) {
    let cities = this.state.cities
    for (let k in cities) {
      if (k === e.target.value) {
        this.setState({
          city: k
        })
        this.changeReviews(k)
      }
      
    }
  }

  changeReviews(city) {
    const lat = this.state.cities[city]['Latitude'];
    const long = this.state.cities[city]['Longitude'];
    
    fetch(`/bikeshares/city/:${long}/:${lat}`)
    .then(res => res.json())
    .then((data) => {
      const bike_share = [];
      for (let i = 0; i < data.length; i++) {
        const bikeRack = {};
        bikeRack.name= data[i].id;
        bikeRack.location = data[i].properties.name;
        bikeRack.vehicles = data[i].properties.num_bikes_available;
        bikeRack.rating = 0;
        bike_share.push(bikeRack);
      }
      this.setState({
        bike_shares: bike_share
      })
    })
  }

  render() {
    let shares;
    if (this.state.bike_shares.length > 0) {
      shares = this.state.bike_shares.map((bike) => {
        return <div className="reviews-margin">
          <p>{bike.name}</p>
          <p>{bike.location}</p>
          <p>{bike.vehicles}</p>
          <p>{bike.rating}</p>
        </div>
      })
    } else {
      shares = <p>Nothing to see here.</p>
    }

    return (
      <div className="reviews-container">
        <div className="reviews-col-start">
            <h2> Cities We're Open In:</h2>
        </div>
        <div className="reviews-col-mid">
          <label><h2>Get Bike Shares From These Cities</h2></label>
          <select className="reviews-margin" value={this.state.city} onChange={this.changeSelection}>
            <option value="New York City">New York City</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Seattle">Seattle</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Portland">Portland</option>
          </select>
          {shares}
        </div>
        <div className="reviews-col-end">
          <h2>Advertisements</h2>
        </div>
      </div>
    )
  }
}

export default Reviews;