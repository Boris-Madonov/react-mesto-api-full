import React from 'react';
import FormFieldset from './FormFieldset';
import FormInput from './FormInput';

function Login({ onLogin }) {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!userEmail || !userPassword) {
      return;
    }

    onLogin(userEmail, userPassword);
    setUserEmail('');
    setUserPassword('');
  };

  return(
    <div className="sign-screen">
      <form
        className="sign-screen__form"
        /* name={`${name}`} */
        action="#"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormFieldset
          formName="form__name_place_sign-screen"
          title="Вход"
          formFieldset="form__fieldset_place_sign-screen"
          submitButton="form__submit-button_place_sign-screen"
          submit="Войти"
        >
          <FormInput
            formFieldName="form__field_place_sign-screen"
            entryFieldName="form__entry-field_place_sign-screen"
            inputId="sign-screen-entry-field-email"
            type="email"
            name="email"
            placeholder="Email"
            value={userEmail || ''}
            onChange={handleChangeEmail}
            minLength='2'
            maxLength='40'
          >
          </FormInput>
          <FormInput
            formFieldName="form__field_place_sign-screen"
            entryFieldName="form__entry-field_place_sign-screen"
            inputId="sign-screen-entry-field-password"
            type="password"
            name="password"
            placeholder="Пароль"
            value={userPassword || ''}
            onChange={handleChangePassword}
            minLength='2'
            maxLength='40'
          >
          </FormInput>
        </FormFieldset>
      </form>
    </div>
  );
}

export default Login