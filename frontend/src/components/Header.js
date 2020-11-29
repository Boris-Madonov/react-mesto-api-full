import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import header__logoPath from '../images/logo/logo-white.svg';

function Header({ onSignOut, loggedIn, userEmail, linkTo, linkName }) {
  const buttonClick = () => {
    if(loggedIn) {
      return onSignOut();
    }
  }

  return (
    <header className="header">
      <img className="header__logo" src={header__logoPath} alt="логотип заголовка" />
      <div className="header__text">
        <p className="header__email">
          {userEmail}
        </p>
        <Link
          className={classNames('header__link', { 'header__link_loggedIn' : loggedIn })}
          to={linkTo}
          onClick={buttonClick}
        >
          {linkName}
        </Link>
      </div>
    </header>
  );
}

export default Header