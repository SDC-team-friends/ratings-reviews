const putReport = require('../routes/helpful.js');
const axios = require('axios');

test('Response has a status of 204', async() => {
  await axios.put('http://localhost:3000/reviews/231324/report')
  .then((results) => {
    expect(results.status).toBe(204);
  })
})