const Reviews = require('./review.js');

const saveReviews = (body, cb) => {
  let newReview = new Reviews({
    name: body.name,
    username: body.username,
    text: body.text,
    rating: body.rating
  })

  newReview.save((err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

const findReviews = (name, cb) => {
  Reviews.find({name: name}, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

module.exports.saveReviews = saveReviews;

module.exports.findReviews = findReviews;