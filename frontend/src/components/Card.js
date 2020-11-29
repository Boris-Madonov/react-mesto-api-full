import React from 'react';
import classNames from 'classnames';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onDeleteCardClick }) {
  const user = React.useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onDeleteCardClick(card);
  };

  const isOwn = card.owner._id === user._id;
  const cardDeleteButtonClassName = classNames('element__remove', { 'element__remove_hidden': !isOwn });

  const isLiked = card.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = classNames('element__like', { 'element__like_liked': isLiked });

  return(
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <p className="element__description">{card.name}</p>
      <div className="element__likes">
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          type="button">
        </button>
        <p className="element__like-counter">{card.likes.length}</p>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button">
      </button>
    </li>
  );
}

export default Card