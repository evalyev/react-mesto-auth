import React from "react";
import { Link, Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import InfoTooltip from "./InfoTooltip";

export default function Register(props) {
  const loggedIn = React.useContext(AppContext)

  return (
    <>
    { loggedIn && <Redirect to="/" />}
      <section className="authoriz">
        <h1 className="authoriz__title">Регистрация</h1>
        <form className="authoriz__form" name="reg">
          <input className="authoriz__input-text" name="e-mail" type="e-mail" placeholder="Email"></input>
          <input className="authoriz__input-text" name="password" type="password" placeholder="Пароль"></input>
          <button className="authoriz__btn-submit" type="submit" >Зарегистрироваться</button>
        </form>
        <Link className="authoriz__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </section>

      <InfoTooltip name="info" isOpen={props.isOpen} onClose={props.onClose} isSuccess={true} />
    </>
  )
}