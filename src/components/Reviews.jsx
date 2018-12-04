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
      page: 0,
      showreviews: 'no',
      show_reviews: [],
      newReview: {
        'name': '',
        'username': '',
        'text': '',
        'rating': 0,
      },
      name: '',
    }
    this.changeSelection = this.changeSelection.bind(this);
    this.flipShares = this.flipShares.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.inputReview = this.inputReview.bind(this);
    this.sendReviews = this.sendReviews.bind(this);
  }

  componentDidMount() {
    this.changeReviews(this.state.city);
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

  findReviews(name) {
    fetch(`bikeshares/city/${name}`)
    .then(res => res.json())
    .then(data => this.setState({
      show_reviews: data
    }));
  }

  renderReviews(e) {
    if (this.state.showreviews === 'no') {
      this.setState({
        showreviews: 'yes',
        name: e.target.dataset.name,
        newReview: {
          'name': '',
          'username': '',
          'text': '',
          'rating': 0,
        }
      })
      this.findReviews(e.target.dataset.name);
    } else {
      this.setState({
        showreviews: 'no',
        newReview: {
          'name': '',
          'username': '',
          'text': '',
          'rating': 0,
        }
      })
    }
  }

  inputReview(e) {
    if (e.target.id === 'review-username') {
      const reviews = Object.assign(this.state.newReview, {});
      reviews['username'] = e.target.value;
      reviews['name'] = this.state.name;
      this.setState({
        newReview: reviews
      })
    }
    if (e.target.id === 'review-rating') {
      const reviews = Object.assign(this.state.newReview, {});
      reviews['rating'] = e.target.value;
      this.setState({
        newReview: reviews
      })
    }
    if (e.target.id === 'review-text') {
      const reviews = Object.assign(this.state.newReview, {});
      reviews['text'] = e.target.value;
      this.setState({
        newReview: reviews
      })
    }
  }

  sendReviews() {
    const keylist = Object.keys(this.state.newReview);

    if (keylist.length < 4) {
      alert('Form not filled out.')
    } else {
      fetch('/bikeshares/city', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(this.state.newReview)
      })
      .then(this.findReviews(this.state.name));
    }
  }

  render() {

    let shares;
    if (this.state.bike_shares.length > 0) {
      const start = this.state.page * 10;
      const sharing_bikes = this.state.bike_shares.slice(start, start + 10);
      shares = sharing_bikes.map((bike) => {
        return <div className="reviews-box">
          <div className="reviews-box-width">
            <span className="reviews-box-start">Name: {bike.name}</span>
            <span className="reviews-box-end">Location: {bike.location}</span>
          </div>
          <div className="reviews-box-width">
            <span className="reviews-box-start">Vehicles: {bike.vehicles}</span>
            <span className="reviews-box-end">Rating: {bike.rating}</span>
          </div>
          <div className="reviews-box-width">
            <span className="reviews-box-center">
              <button type="submit" className="reviews-button" onClick={this.renderReviews} data-name={bike.name}>Get Reviews For Bike Share</button>
            </span>
          </div>
        </div>
      })
    } else {
      shares = <p>Nothing to see here.</p>
    }

    let templateRender;

    if (this.state.showreviews === 'yes') {
      let showReviews;
      showReviews = this.state.show_reviews.map((review) => {
        return <div className="reviews-box">
          <div>User: {review.username}</div>
          <div>Review: {review.text}</div>
          <div>Rating: {review.rating}</div>
        </div>
      })
      templateRender = <div className="reviews-showreviews">
        <h2>Reviews for {this.state.name}</h2>
        {showReviews}
        <div className="reviews-form">
          <input type="text" id="review-username" className="reviews-username" value={this.state.newReview.username} onChange={this.inputReview} placeholder="Enter Username"></input>
          <label>Enter Rating</label>
          <select className="reviews-margin" className="reviews-select" id="review-rating" value={this.state.newReview.rating} onChange={this.inputReview}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label>Enter Review</label>
            <textarea height="700" width="500" className="reviews-text" id="review-text" value={this.state.newReview.text} onChange={this.inputReview}></textarea>
          <button type="submit" className="reviews-form-submit" onClick={this.sendReviews}>Submit Review</button>
        </div>
        <button type="submit" className="reviews-button" onClick={this.renderReviews}>Go Back!</button>
      </div>
    } else {
      templateRender = <div><label><h2>Get Bike Shares From These Cities</h2></label>
        <select className="reviews-margin" value={this.state.city} onChange={this.changeSelection}>
          <option value="New York City">New York City</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Seattle">Seattle</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Portland">Portland</option>
        </select>
          { shares }
        <div className="reviews-margin">
          <span className="reviews-span-space"><i class="fas fa-arrow-left" onClick={this.flipShares} data-set="back"></i></span>
          <span className="reviews-span-space"><i class="fas fa-arrow-right" onClick={this.flipShares} data-set="forward"></i></span>
        </div>
      </div>
    }

    return (
      <div className="reviews-container">
        <div className="reviews-col-start">
            <h2> Cities We're Open In:</h2>
            <div className="reviews-citylist">
              <p className="reviews-indcity">San Francisco</p>
              <p className="reviews-indcity">New York City</p>
              <p className="reviews-indcity">Los Angeles</p>
              <p className="reviews-indcity">Portland</p>
              <p className="reviews-indcity">Seattle</p>
            </div>
        </div>
        <div className="reviews-col-mid">
          {templateRender}
        </div>
        <div className="reviews-col-end">
          <h2>Advertisements</h2>
        </div>
      </div>
    )
  }
}

export default Reviews;