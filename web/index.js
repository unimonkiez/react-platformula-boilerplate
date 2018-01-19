const path = require('path');
const express = require('express');
const app = require('./app');

const staticPath = path.join(__dirname, 'dist');
const port = process.env.PORT;

const start = () => {
  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`Listening at localhost:${port}`);
  });
};

app.use(express.static(staticPath));
start();
