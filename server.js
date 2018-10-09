'use strict';

// Load array of notes
// const data = require('./db/notes');

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require('./db/notes');

const app = express();

const { PORT } = require('./config');

const { log } = require('./middleware/logger');

app.use(log);

// const morgan = require('morgan');

// app.use(morgan('common'));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  let searchToLowerCase = '';

  if (searchTerm) {
    searchToLowerCase = searchTerm.toLowerCase();
  }

  if (searchToLowerCase) {
    let searchResult = data.filter(item => (item.title).toLowerCase().includes(searchToLowerCase));
    // let searchResult = data.filter(item => {
    //   let itemTitleToLowerCase = (item.title).toLowerCase();
    //   return itemTitleToLowerCase.includes(searchToLowerCase);
    // });
    res.json(searchResult);
  } else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  res.json(data.find(item => item.id === Number(id)));
});

// ADD STATIC SERVER HERE

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
}); 
