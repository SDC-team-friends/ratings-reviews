require('dotenv').config();
const axios = require('axios');

test('Should return metadata in correct format', () => {
  axios.get(`http://localhost:${process.env.PORT}/reviews/meta?product_id=40404`)
  .then((results) => {
    let {data} = results;
    expect(data).toBeInstanceOf(Object);
  })
})