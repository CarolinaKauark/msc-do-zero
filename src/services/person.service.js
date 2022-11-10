const personModel = require('../models/person.model');

const getPeople = async () => {
  const allPeople = await personModel.getAll();

  return { type: null, message: allPeople };
}

module.exports = {
  getPeople,
}