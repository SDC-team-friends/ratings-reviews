require('dotenv').config();
const putHelpful = require('../routes/helpful.js');
const axios = require('axios');

test('Response has a status of 204', async() => {
  await axios.put(`http://localhost:${process.env.PORT}/reviews/232420/helpful`)
  .then((results) => {
    expect(results.status).toBe(204)
  })
})