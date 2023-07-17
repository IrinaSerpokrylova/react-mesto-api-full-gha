const { NODE_ENV, JWT_SECRET } = process.env;

const jwtCheck = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');

module.exports = (req, res, next) => {
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const { jwt } = req.cookies;
  let payload;

  try {
    payload = jwtCheck.verify(jwt, secretKey);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
