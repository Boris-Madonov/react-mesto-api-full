import React from 'react';
import FormFieldset from './FormFieldset';

function PopupWithForm({
  formName,
  formFieldset,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  submitButton,
  submit
}) {
  return(
    <section className={`popup popup__${name} ${isOpen && 'popup_opened'}`}>
      <form
        className="popup__container"
        name={`${name}`}
        action="#"
        method="GET"
        onSubmit={onSubmit}
        noValidate
      >
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        >
        </button>
        <FormFieldset
          formName={formName}
          title={title}
          formFieldset={formFieldset}
          children={children}
          submitButton={submitButton}
          submit={submit}
        >
        </FormFieldset>
      </form>
    </section>
  );
}

export default PopupWithForm