const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const notFoundHandler = require('../controllers/notFoundHandler');
const {
  getUsers,
  getCurrentUser,
  createUser,
  login,
} = require('../controllers/users');
const {
  getCards,
  createCard,
  deleteCard,
} = require('../controllers/cards');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

router.use(auth);

router.get('/users', getUsers);
router.get('/cards', getCards);

router.get('/users/me', getCurrentUser);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.all('*', notFoundHandler);

module.exports = router;
