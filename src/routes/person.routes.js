const express = require('express');
const personController = require('../controllers/person.controller');

const personRouter = express.Router();

personRouter.get('/', personController.getPeople);

module.exports = personRouter;