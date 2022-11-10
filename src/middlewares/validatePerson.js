const validateName = (req, res, next) => {
  const people = req.body;

  const hasName = people.every(({ name }) => (name !== undefined && name !== null) && name.length > 5);
  
  if (!hasName) return res.status(400).json({ message: 'Campo "name" é inválido' });

  next();
}


module.exports = {
  validateName,
}
