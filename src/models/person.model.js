const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM register_db.person',
  );

  return result;
}

module.exports = {
  getAll,
}