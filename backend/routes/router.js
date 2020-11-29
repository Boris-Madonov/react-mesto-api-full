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
    /* name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(), */
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }).unknown(true),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }).unknown(true),
}), login);

router.use(auth);

router.get('/users', getUsers);
router.get('/cards', getCards);

router.get('/users/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum(),
  }).unknown(true),
}), getCurrentUser);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    likes: Joi.object(),
    createdAt: Joi.date(),
  }).unknown(true),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }).unknown(true),
}), deleteCard);

router.all('*', notFoundHandler);

module.exports = router;
