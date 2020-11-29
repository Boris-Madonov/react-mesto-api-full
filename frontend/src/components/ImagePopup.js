import React from 'react';

function ImagePopup({ card, onClose }) {
  return(
    <section className={`popup popup__image ${card && 'popup_opened'}`}>
      <div className="popup__item">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        >
        </button>
        <img
          className="popup__item-image"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__item-name">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup