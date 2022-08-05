const {Pool} = require('pg');

const pool = new Pool({
  user: 'noatongi',
  host: 'localhost',
  database: 'sdc',
});

pool.connect((err) => {
  if (err) {
    console.error(err);
  }
})

module.exports = pool;