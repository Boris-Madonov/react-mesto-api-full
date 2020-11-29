import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onDeleteCardClick,
  cards,
}) {
  const user = React.useContext(CurrentUserContext);

  return(
    <main className="content">

      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img
              className="profile__avatar-image"
              src={user.avatar}
              alt="аватар профиля"
            />
            <button
              className="profile__avatar-edit"
              type="button"
              onClick={onEditAvatar}
            >
            </button>
          </div>
          <div className="profile__text">
            <p className="profile__text-name">
              {user.name}
            </p>
            <button
              className="profile__text-edit"
              type="button"
              onClick={onEditProfile}
            >
            </button>
            <p className="profile__text-description">
              {user.about}
            </p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteCardClick={onDeleteCardClick}
            />
          ))}
        </ul>
      </section>

    </main>
  );
}

export default Main