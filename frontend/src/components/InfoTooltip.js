import React from 'react';
import popup__registerIconFailPath from '../images/fail.svg';
import popup__registerIconSuccessPath from '../images/success.svg';


function InfoTooltip({
  isOpen,
  onClose,
  isSuccess
}) {
  return(
    <section className={`popup popup__register ${isOpen && 'popup_opened'}`}>
      <div
        className="popup__container"
      >
        <img
          className="popup__register-icon"
          src={isSuccess ? popup__registerIconSuccessPath : popup__registerIconFailPath}
          alt="картинка регистрации"
        />
        <p className="popup__message-text">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        >
        </button>
      </div>
    </section>
  );
}

export default InfoTooltip