const express = require('express');
const personController = require('../controllers/person.controller');
const { validateName, validateId } = require('../middlewares/validatePerson');
const personRouter = express.Router();

personRouter.get('/', personController.getPeople);
personRouter.post('/', validateName, personController.insertPeople);
personRouter.put('/:id', personController.updateById);

module.exports = personRouter;