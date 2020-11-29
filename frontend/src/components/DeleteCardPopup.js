import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ card, isOpen, onClose, onCardDelete, isLoading }) {

  const submitButtonText = isLoading ? 'Удаление...' : 'Да';

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  return(
    <PopupWithForm
      name="delete-item"
      title="Вы уверены?"
      submit={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formName="form__name_place_popup"
      formFieldset="form__fieldset_place_popup"
      submitButton="form__submit-button_place_popup"
    />
  );
}

export default DeleteCardPopup