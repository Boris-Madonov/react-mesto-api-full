import React from 'react';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const user = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState('')

  React.useEffect(() => {
    setAvatar(user.avatar);
  }, [user]);

  const handleChangeAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const submitButtonText = isLoading ? 'Сохранение...' : 'Сохранить';

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      link: avatar,
    });
  };

  return(
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
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
        inputId="popup__entry-field_avatar-image-url"
        type="url"
        name="link"
        placeholder="Укажите ссылку на аватар"
        value={avatar || ''}
        onChange={handleChangeAvatar}
        minLength=''
        maxLength=''
      >
      </FormInput>
    </PopupWithForm>
  );
}

export default EditAvatarPopup