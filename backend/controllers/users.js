const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { badRequestError, unauthorizedError, notFoundError } = require('../errors/errors');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    return res.send(users);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw notFoundError('Нет пользователя с таким id');
    }

    return res.send(user);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        User.create({
          email: req.body.email,
          password: hash,
        });
      });

    return res.send(user);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return badRequestError(error.message);
    }
    return next(error);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((error) => {
      console.log(error);
      return next(unauthorizedError(error.message));
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  login,
};
