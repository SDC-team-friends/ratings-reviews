const reviews = require('./reviews.js');

module.exports = app => {
  app.use('/reviews', reviews);
}