const express = require('express');
const {Pool, Client} = require('pg');
const mountRoutes = require('./routes/index.js')


const app = express();
app.use(express.json);
mountRoutes(app)

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
