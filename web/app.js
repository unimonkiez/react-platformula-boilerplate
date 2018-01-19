const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({ secret: 'secrectly secret', saveUninitialized: true, resave: false, cookie: { maxAge: 3600000 } })); // Hour

module.exports = app;
