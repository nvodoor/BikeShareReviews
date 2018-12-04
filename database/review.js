const mongoose = require('mongoose');

const bikeReviewSchema = mongoose.Schema({
  name: String,
  username: String,
  text: String,
  rating: Number
});

const Reviews = mongoose.model('bikereviews', bikeReviewSchema);

module.exports = Reviews;