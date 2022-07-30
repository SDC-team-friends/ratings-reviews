const Router = require('express-promise-router');
const db = require('../../db');
const router = new Router();

module.exports = router;

router.get('/reviews', async (req, res) => {
  await db.query()
})