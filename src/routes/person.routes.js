const express = require('express');
const personController = require('../controllers/person.controller');
const { validateName } = require('../middlewares/validatePerson');
const personRouter = express.Router();

personRouter.get('/', personController.getPeople);
personRouter.post('/', validateName, personController.insertPeople);
personRouter.put('/:id', personController.updateById);
personRouter.delete('/:id', personController.remove);

module.exports = personRouter;