const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM register_db.person',
  );

  return result;
};

const insertPerson = async ({name, email, birthDate, cpf}) => {
  await connection.execute(
    'INSERT INTO register_db.person (name, email, birth_date, cpf) VALUES (?, ?, ?, ?)',
    [name, email, birthDate, cpf],
  );
};

const updateById = async (id, { name, email, birthDate, cpf }) => connection.execute(
  'UPDATE register_db.person SET name = (?), email = (?), birth_date = (?), cpf = (?) WHERE id = (?)',
  [name, email, birthDate, cpf, id],
);

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM register_db.person WHERE id = (?)',
    [id],
  );

  return result;
};

const remove = async (id) => {
  await connection.execute(
    'DELETE * FROM register_db.person WHERE id = (?)',
    [id],
  );
};

module.exports = {
  getAll,
  insertPerson,
  updateById,
  getById,
  remove,
}