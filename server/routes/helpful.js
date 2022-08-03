const db = require('../../db');

const putHelpful = (req, res) => {
  const {review_id} = req.params;

  db.query(`
    UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id};
  `)
  .then(() => {
    res.send('Marked as helpful');
  })
}

module.exports = putHelpful;