const db = require('../../db');

const putReport = (req, res) => {
  const {review_id} = req.params;

  db.query(`
    UPDATE reviews SET reported = true WHERE id = ${review_id};
  `)
  .then(() => {
    res.send('Reported');
  })
}

module.exports = putReport;