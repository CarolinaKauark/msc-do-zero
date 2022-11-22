const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const personController = require('../../../controllers/person.controller');
const personService = require('../../../services/person.service');
const { personDataBase, person } = require('../mock/person.mock');

describe('Testa a camada controller para a rota "/person"', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada controller para a função "getPeople"', function () {
    it('Busca por todas as pessoas cadastradas', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(personService, 'getPeople').resolves({ type: 200, message: personDataBase });

      await personController.getPeople(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(personDataBase);
    });
  });

  describe('Testa a camada controller para a função "insertPeople"', function () {
    it('Faz a inserção de uma nova pessoa', async function () {
      const req = { body: person };
      const res = {};
      const result  = [ ...personDataBase, { id: 4, ...person } ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(personService, 'insertPeople').resolves({ type: null, message: result });

      await personController.insertPeople(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(result);
    });

    it('Tenta fazer a inserção de uma nova pessoa sem sucesso', async function () {
      const req = { body: person };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(personService, 'insertPeople').resolves({ type: 404, message: 'Essa pessoa não existe' });

      await personController.insertPeople(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Essa pessoa não existe' });
    });
  });

  describe('Testa a camada controller para a função "updateById"', function () {
    it('Faz a atualização de uma pessoa pelo id', async function () {
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(personService, 'updateById').resolves({ type: null, message: 2 });

      await personController.updateById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(2);
    });

    it('Testa fazer a atualização de uma pessoa pelo id sem sucesso', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(personService, 'updateById').resolves({ type: 404, message: 'Essa pessoa não existe' });

      await personController.updateById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Essa pessoa não existe' });
    });
  });


  describe('Testa a camada controller para a função "remove"', function () {
    it('Faz a remoção de uma pessoa através do id', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(personService, 'remove').resolves({ type: null, message: 'Operação realizada com sucesso!' });

      await personController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith({ message: 'Operação realizada com sucesso!' });
    });

    it('Faz a remoção de uma pessoa através do id', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(personService, 'remove').resolves({ type: 404, message: 'Essa pessoa não existe' });

      await personController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Essa pessoa não existe' });
    });
  });
});
