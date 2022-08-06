require('dotenv').config();
const express = require('express');
const {Pool, Client} = require('pg');
const mountRoutes = require('./routes/index.js')

const app = express();
app.use(express.json());
app.use(mountRoutes);

app.get('/test', (req, res) => {
  console.log('test endpoint');
  res.send('test endpoint');
})

app.listen(process.env.PORT , () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
