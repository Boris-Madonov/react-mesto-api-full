const Card = require('../models/card');
const { badRequestError, notFoundError } = require('../errors/errors');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    return res.send(cards);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });

    return res.send(card);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return badRequestError(error.message);
    }
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw notFoundError('Нет карточки с таким id');
    }
    if (toString(card.owner) !== toString(req.user._id)) {
      throw notFoundError('Нет прав на удаление карточки');
    }
    card.deleteOne();

    return res.send(card);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    return res.send(card);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    return res.send(card);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
