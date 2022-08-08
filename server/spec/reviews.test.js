require('dotenv').config();
const axios = require('axios');

test('Should return an object with the correct format on get request', async() => {
  await axios.get(`http://localhost:${process.env.PORT}/reviews?product_id=40404`)
  .then((results) => {
    let {data} = results;
    expect(data).toMatchObject({
      product: '40404',
      page: '0',
      count: '5',
    })
    expect(data.results[0]).toEqual({
      "body": "Necessitatibus voluptatem architecto et et. Similique molestiae voluptates et quia consequatur quisquam sit. Illo atque omnis quisquam quam qui aut est et praesentium. Voluptates vitae autem blanditiis laboriosam possimus. Facilis molestiae maiores quis et excepturi voluptates repellat tenetur.",
      "date": "2020-08-11T19:22:25",
      "helpfulness": 60,
      "photos": null,
      "rating": 1,
      "recommend": false,
      "response": "null",
      "review_id": 232419,
      "reviewer_name": "Joanne_Kling19",
      "summary": "Ea perferendis officia.",
    }
    )
  })
})

test('Should return status code 201', async() => {
  await axios.post('http://localhost:3000/reviews', {
    product_id: 40404,
    rating: 4,
    summary: 'This review is from jest',
    body: 'This is simply a test review',
    recommend: true,
    name: 'jest',
    email: 'jest@gmail.com',
    photos: null,
    characteristics: {
      "135192": 3
    }
  })
  .then((results) => {
    expect(results.status).toBe(201);
  })
})