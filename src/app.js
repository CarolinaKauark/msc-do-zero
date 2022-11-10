const express = require('express');
const personRouter = require('./routes/person.routes');
const app = express();

app.use(express.json());

app.use('/person', personRouter);

module.exports = app;