const express = require('express');
const cors = require('cors');
const colors = require('colors');

const {
  getCompliments,
  addCompliments,
  deleteCompliment,
  getAllCompliments,
  getSingleCompliment,
  updateCompliment,
} = require('./controlers');

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get('/api/compliments', getAllCompliments);
app.get('/api/compliment', getCompliments);
app.put('/api/compliment', updateCompliment);
app.get('/api/compliment/:id', getSingleCompliment);
app.post('/api/compliment', addCompliments);
app.delete('/api/compliment/:id', deleteCompliment);

app.listen(4000, () =>
  console.log('Server running on http://localhost:4000'.yellow.bold)
);
