import React from 'react';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const submitButtonText = isLoading ? 'Сохранение...' : 'Создать';

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  };

  return(
    <PopupWithForm
      name="new-item"
      title="Новое место"
      submit={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formName="form__name_place_popup"
      formFieldset="form__fieldset_place_popup"
      submitButton="form__submit-button_place_popup"
    >
      <FormInput
        formFieldName="form__field_place_popup"
        entryFieldName="form__entry-field_place_popup"
        inputId="popup__entry-field_item-name"
        type="text"
        name="name"
        placeholder="Название"
        value={name || ''}
        onChange={handleChangeName}
        minLength="1"
        maxLength="30"
      >
      </FormInput>
      <FormInput
        formFieldName="form__field_place_popup"
        entryFieldName="form__entry-field_place_popup"
        inputId="popup__entry-field_item-image-url"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={link || ''}
        onChange={handleChangeLink}
        minLength=''
        maxLength=''
      >
      </FormInput>
    </PopupWithForm>
  );
}

export default AddPlacePopup