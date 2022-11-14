const sinon = require('sinon');
const { expect } = require('chai');

const personService = require('../../../services/person.service');
const personModel = require('../../../models/person.model');
const { personDataBase, person, id } = require('../mock/person.mock');

describe('Testa a camada service para a rota "/person"', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada service para a função "getPeople"', function () {
    it('Busca por todas as pessoas cadastradas', async function () {
      const result = { type: null, message: personDataBase }

      sinon.stub(personModel, 'getAll').resolves(personDataBase);

      const response = await personService.getPeople();

      expect(response).to.be.deep.equal(result);
    });
  });

  describe('Testa a camada service para a função "insertPeople"', async function () {
    it('Faz a inserção de uma nova pessoa', async function () {
      const result = { type: null, message: personDataBase }

      sinon.stub(personModel, 'insertPerson').resolves(undefined);
      sinon.stub(personModel, 'getAll').resolves(personDataBase);

      const response = await personService.insertPeople([person]);

      expect(response).to.be.deep.equal(result);
    });
  });

  describe('Testa a camada service para a função "updateById"', async function () {
    it('Faz a atualização de uma pessoa pelo id', async function () {
      const result = { type: null, message: id };

      sinon.stub(personModel, 'getById').resolves([person]);
      sinon.stub(personModel, 'updateById').resolves(undefined);

      const responde = await personService.updateById(id, person);

      expect(responde).to.be.deep.equal(result);
    });

    it('Tenta realizar a atualização de uma pessoa com um id que não existe', async function () {
      const result = { type: 404, message: 'Essa pessoa não existe' };

      sinon.stub(personModel, 'getById').resolves([]);

      const responde = await personService.updateById(id, person);

      expect(responde).to.be.deep.equal(result);
    });
  });
});
