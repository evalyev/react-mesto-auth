import logo from '../images/logo.svg';
import { Link, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
    
      <img className="header__logo" src={logo} alt="Логотип" />

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