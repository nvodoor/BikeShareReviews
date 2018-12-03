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
      bike_shares: [],
      page: 0
    }
    this.changeSelection = this.changeSelection.bind(this);
    this.flipShares = this.flipShares.bind(this);
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

  flipShares(e) {
    let count;
    // e.target.dataset.set - necessary to access data attribute
    console.log(this.state.bike_shares.length);
    const direction = e.target.dataset.set
    if (direction === 'back') {
      count = this.state.page - 1;
      if (count >= 0) {
        this.setState({
          page: count
        })
      }
    } else {
      if (this.state.page*10 < this.state.bike_shares.length) {
        count = this.state.page + 1;
        this.setState({
          page: count
        })
      }
    }
  }

  render() {
    let shares;
    if (this.state.bike_shares.length > 0) {
      const start = this.state.page*10;
      const sharing_bikes = this.state.bike_shares.slice(start, start + 10);
      shares = sharing_bikes.map((bike) => {
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
          <div className="reviews-margin">
            <span className="reviews-span-space"><i class="fas fa-arrow-left" onClick={this.flipShares} data-set="back"></i></span>
            <span className="reviews-span-space"><i class="fas fa-arrow-right" onClick={this.flipShares} data-set="forward"></i></span>
          </div>
        </div>
        <div className="reviews-col-end">
          <h2>Advertisements</h2>
        </div>
      </div>
    )
  }
}

export default Reviews;