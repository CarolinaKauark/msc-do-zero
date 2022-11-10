require('http-status-codes');
const personService = require('../services/person.service');

const getPeople = async (_req, res) => {
  const { type, message } = await personService.getPeople();

  if(type) return res.status(type).json(message);

  return res.status(200).json(message);
}

module.exports = {
  getPeople,
};