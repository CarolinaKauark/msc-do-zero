const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/db/connection');
const personModel = require('../../../models/person.model');
const { personDataBase, person, id } = require('../mock/person.mock');

describe('Testa a camada model para a rota "/person"', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada model para a função "getAll"', function () {
    it('Busca por todas as pessoas cadastradas', async function () {
      sinon.stub(connection, 'execute').resolves([personDataBase]);

      const response = await personModel.getAll();
      expect(response).to.be.deep.equal(personDataBase);
    });
  });

  describe('Testa a camada model para a função "insertPerson"', function () {
    it('Faz a inserção de uma nova pessoa', async function () {
      sinon.stub(connection, 'execute').resolves();

      const response = await personModel.insertPerson(person);
      expect(response).to.be.equal(undefined);
    });
  });

  describe('Testa a camada model para a função "updateById"', function () {
    it('Faz a atualização de uma nova pessoa pelo id', async function () {
      sinon.stub(connection, 'execute').resolves();

      const response = await personModel.updateById(id, person);
      expect(response).to.be.equal(undefined);
    });
  });

  describe('Testa a camada model para a função "getById"', function () {
    it('Faz a busca de uma pessoa pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([person]);

      const response = await personModel.getById(id);
      expect(response).to.be.equal(person);
    });
  });

  describe('Testa a camada model para a função "remove"', function () {
    it('Faz a remoção de uma pessoa com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves(undefined);

      const response = await personModel.remove(id);

      expect(response).to.be.equal(undefined);
    });
  });
});
