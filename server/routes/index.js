const {getReviews, postReview} = require('./reviews.js');
const getMetadata = require('./metadata.js');
const putHelpful = require('./helpful.js');
const putReport = require('./report.js');
const Router = require('express-promise-router');

const router = Router();

router.get('/reviews/meta', getMetadata);
router.get('/reviews', getReviews);
router.post('/reviews', postReview);
router.put('/reviews/:review_id/helpful', putHelpful);
router.put('/reviews/:review_id/report', putReport);


module.exports = router;