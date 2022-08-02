const getReviews = require('./reviews.js');
const Router = require('express-promise-router');

const router = Router();

router.get('/reviews', getReviews);

module.exports = router;