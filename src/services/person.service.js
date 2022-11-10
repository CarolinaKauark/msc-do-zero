const personModel = require('../models/person.model');

const getPeople = async () => {
  const allPeople = await personModel.getAll();

  return { type: null, message: allPeople };
}

const insertPeople = async (people) => {
  await Promise.all(people.map(async (person) => personModel.insertPerson(person)));

  return getPeople();
}

const updateById = async (id, person) => {
  await personModel.updateById(id, person);
  return { type: null, message: id };
}

module.exports = {
  getPeople,
  insertPeople,
  updateById,
}