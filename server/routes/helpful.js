const db = require('../../db');

const putHelpful = (req, res) => {
  const {review_id} = req.params;

  db.query(`
    UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id};
  `)
  .then(() => {
    res.status(204).send(`Status: ${res.status} NO CONTENT`);
  })
  .catch((error) => {
    res.send(error);
  })
}

module.exports = putHelpful;