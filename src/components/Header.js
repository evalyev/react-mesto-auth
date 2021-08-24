import logo from '../images/logo.svg';
import { Link, Route } from "react-router-dom";
import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header(props) {
  const loggedIn = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">

      <img className="header__logo" src={logo} alt="Логотип" />

      {loggedIn && (
        <div className="header__user-info">
          <p className="header__email">
            {currentUser?.email}
          </p>
          <button className="header__btn-exit" type="button" onClick={props.onExit}>
            Выйти
          </button>
        </div>
      )}

      <Route path="/sign-in">
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Route>
    </header>
  )
}

export default Header;