const personModel = require('../models/person.model');

const getPeople = async () => {
  const allPeople = await personModel.getAll();

  return { type: null, message: allPeople };
};

const insertPeople = async (people) => {
  await Promise.all(people.map(async (person) => personModel.insertPerson(person)));

  return getPeople();
};

const updateById = async (id, person) => {
  const hasPerson = await personModel.getById(id);
  if(!hasPerson.length) return { type: 404, message: 'Essa pessoa não existe' };

  await personModel.updateById(id, person);
  return { type: null, message: id };
};


const remove = async (id) => {
  const hasPerson = await personModel.getById(id);
  if (!hasPerson.length) return { type: 404, message: 'Essa pessoa não existe' };

  await personModel.remove(id);

  return { type: null, message: 'Operação realizada com sucesso!'}
};

module.exports = {
  getPeople,
  insertPeople,
  updateById,
  remove,
}