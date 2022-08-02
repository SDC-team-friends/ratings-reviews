const db = require('../../db');

const getMetadata = (req, res) => {

  var {product_id} = req.query;

  db.query(`
    WITH
      metadata AS (SELECT characteristic_id, value, name, reviews.product_id, reviews.recommend, reviews.rating
        FROM characteristics_reviews
        INNER JOIN characteristics ON characteristics.id = characteristics_reviews.characteristic_id
        INNER JOIN reviews ON reviews.id = characteristics_reviews.review_id
        WHERE reviews.product_id = ${product_id}),
      char_info AS (SELECT characteristic_id AS id, name, AVG(value)::numeric(10,2) AS value
        FROM metadata
        GROUP BY name, characteristic_id),
      char_object AS (SELECT json_object_agg(name, json_build_object('id', id, 'value', value))
        FROM char_info),
      meta_r AS (SELECT id, product_id, rating, recommend
        FROM reviews
        WHERE product_id = ${product_id})
    SELECT json_build_object(
      'product_id', ${product_id},
      'ratings', json_build_object(
        1, (SELECT COUNT(rating) FROM meta_r WHERE rating = 1),
        2, (SELECT COUNT(rating) FROM meta_r WHERE rating = 2),
        3, (SELECT COUNT(rating) FROM meta_r WHERE rating = 3),
        4, (SELECT COUNT(rating) FROM meta_r WHERE rating = 4),
        5, (SELECT COUNT(rating) FROM meta_r WHERE rating = 5)),
      'recommended', json_build_object(
        0, (SELECT COUNT(recommend) FROM meta_r WHERE recommend = false),
        1, (SELECT COUNT(recommend) FROM meta_r WHERE recommend = true)),
      'characteristics', (SELECT * FROM char_object)) AS meta
    ;
  `)
  .then((results) => {
    res.send(results.rows[0].meta)
  })
}

module.exports = getMetadata;