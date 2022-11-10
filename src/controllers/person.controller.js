require('http-status-codes');
const personService = require('../services/person.service');

const getPeople = async (_req, res) => {
  const { type, message } = await personService.getPeople();

  if(type) return res.status(type).json(message);

  return res.status(200).json(message);
}

const insertPeople = async (req, res) => {
  const people = req.body;
  const { type, message } = await personService.insertPeople(people);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const updateById = async (req, res) => {
  const person = req.body;
  const { id } = req.params;
  const { type, message } = await personService.updateById(id, person);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
}

module.exports = {
  getPeople,
  insertPeople,
  updateById,
};