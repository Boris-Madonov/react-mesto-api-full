import React from 'react';

function FormInput({
  formFieldName,
  entryFieldName,
  inputId,
  type,
  name,
  placeholder,
  value,
  onChange,
  minLength,
  maxLength,
  }) {
  return(
    <label className={`form__field ${formFieldName}`}>
      <input
        className={`form__entry-field ${entryFieldName} ${inputId}`}
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span
        className="form__entry-field-error"
        id={`${inputId}-error`}>
      </span>
    </label>
  );
}

export default FormInput