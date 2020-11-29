const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { unauthorizedError } = require('../errors/errors');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization && !authorization.startsWith('Bearer ')) {
      return next(unauthorizedError('Необходима авторизация'));
    }

    const token = authorization.replace('Bearer ', '');

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    console.log(error);
    return next(unauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
