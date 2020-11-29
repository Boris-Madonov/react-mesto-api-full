import React from 'react';

function FormFieldset({ formName, title, formFieldset, children, submitButton, submit }) {
  return(
    <>
      <p className={`form__name ${formName}`}>{`${title}`}</p>
      <fieldset className={`form__fieldset ${formFieldset}`}>
        {children}
        <button
          className={`form__submit-button ${submitButton}`}
          type="submit"
        >{`${submit}`}
        </button>
      </fieldset>
    </>
  );
}

export default FormFieldset