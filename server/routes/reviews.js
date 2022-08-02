
const db = require('../../db');

const getReviews = (req, res) => {
  //product_id => req.query.product_id
  var {product_id, sort, page = 0, count = 5} = req.query
  if (sort = 'helpful') { sort = 'helpfulness' };
  if (sort = 'newest') { sort = 'date'}
  db.query(`
  WITH review_page as (
    SELECT * FROM reviews WHERE product_id = ${product_id} ORDER BY ${sort} DESC NULLS LAST LIMIT ${count} OFFSET ${page * count}
  )
  SELECT json_build_object(
    'product', '${product_id}',
    'page', '${page}',
    'count', '${count}',
    'results', (SELECT json_agg(json_build_object(
      'review_id', review_page.id,
      'rating', review_page.rating,
      'summary', review_page.summary,
      'recommend', review_page.recommend,
      'response', review_page.response,
      'body', review_page.body,
      'date', to_timestamp(date/1000)::timestamp,
      'reviewer_name', review_page.reviewer_name,
      'helpfulness', review_page.helpfulness,
      'photos', (
        WITH
        images AS (SELECT id, url FROM reviews_photos WHERE review_id = review_page.id),
        image_objects AS (SELECT row_to_json(images) FROM images)
        SELECT json_agg(row_to_json) FROM image_objects)
      )
      )
      FROM review_page
    )) AS reviews
    ;
  `)
  .then((results) => {
    res.send(results.rows[0].reviews);
  })
}

module.exports = getReviews;

// WITH review_page as (
//   SELECT * FROM reviews WHERE product_id = 40404 ORDER BY helpfulness DESC NULLS LAST LIMIT 5 OFFSET 0
// )
// SELECT to_timestamp(date / 1000)::timestamp from review_page