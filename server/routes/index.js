const getReviews = require('./reviews.js');
const getMetadata = require('./metadata.js');
const Router = require('express-promise-router');

const router = Router();

router.get('/reviews/meta', getMetadata);
router.get('/reviews', getReviews);


module.exports = router;