const db = require('../../db');

const getReviews = (req, res) => {

  var {product_id, sort, page = 0, count = 5} = req.query
  var sortRelevant = '';

  if (sort = 'helpful') { sort = 'helpfulness' };
  if (sort = 'newest') { sort = 'date'};
  if (sort = 'relevant') {
    sort = 'helpfulness';
    sortRelevant = ', date DESC NULLS LAST';
  }

  db.query(`
    WITH review_page as (
      SELECT * FROM reviews WHERE product_id = ${product_id}
      ORDER BY ${sort} DESC NULLS LAST ${sortRelevant}
      LIMIT ${count} OFFSET ${page * count}
    )
    SELECT json_build_object(
      'product', '${product_id}',
      'page', '${page}',
      'count', '${count}',
      'results', (SELECT json_agg(json_build_object(
        'review_id', id,
        'rating', rating,
        'summary', summary,
        'recommend', recommend,
        'response', response,
        'body', body,
        'date', to_timestamp(date/1000)::timestamp,
        'reviewer_name', reviewer_name,
        'helpfulness', helpfulness,
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

const postReview = (req, res) => {

  const {product_id, rating, summary, body, recommend, name, email, photos, characteristics} = req.body;
  const datetime = new Date().getTime();

  var charIds = [];
  var charValues = [];
  for (let id in characteristics) {
    charIds.push(id);
    charValues.push(characteristics[id]);
  }
  var hasPhotos = 'SELECT * FROM char_review_insert';
  if (photos !== null){
    if (photos.length > 0){
      hasPhotos = `INSERT INTO reviews_photos (review_id, url)
      SELECT r_id, unnest(ARRAY[${photos}])
      FROM char_review_insert`
    }
  }

  db.query(
    `WITH
    review_insert AS (
      INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, date)
      VALUES (${product_id}, ${rating}, '${summary}', '${body}', ${recommend}, '${name}', '${email}', ${datetime})
      RETURNING id AS r_id),
    char_review_insert AS (
      INSERT INTO characteristics_reviews (characteristic_id, value, review_id)
      SELECT unnest(ARRAY[${charIds}]), unnest(ARRAY[${charValues}]), r_id
      FROM review_insert
      RETURNING review_id as r_id)
    ${hasPhotos}
    ;`
  )
  .then(() => {
    res.send('Posted');
  })
  .catch((err) => {
    console.error(err);
  })
}

module.exports = {getReviews, postReview};