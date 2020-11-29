import React from 'react';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const submitButtonText = isLoading ? 'Сохранение...' : 'Сохранить';

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
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
        inputId="popup__entry-field_account-name"
        type="text"
        name="name"
        placeholder="Введите имя"
        value={name || ''}
        onChange={handleChangeName}
        minLength="2"
        maxLength="40"
      >
      </FormInput>
      <FormInput
        formFieldName="form__field_place_popup"
        entryFieldName="form__entry-field_place_popup"
        inputId="popup__entry-field_account-description"
        type="text"
        name="about"
        placeholder="Введите описание"
        value={description || ''}
        onChange={handleChangeDescription}
        minLength="2"
        maxLength="200"
      >
      </FormInput>
    </PopupWithForm>
  );
}

export default EditProfilePopup
