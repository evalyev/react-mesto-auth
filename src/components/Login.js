import React from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import InfoTooltip from "./InfoTooltip";

export default function Login(props) {
  const loggedIn = React.useContext(AppContext);

  return (
    <>
    { loggedIn && <Redirect to="/" />}
    <section className="authoriz">
      <h1 className="authoriz__title">Вход</h1>
      <form className="authoriz__form" name="login">
        <input className="authoriz__input-text" name="e-mail" type="e-mail" placeholder="Email"></input>
        <input className="authoriz__input-text" name="password" type="password" placeholder="Пароль"></input>
        <button className="authoriz__btn-submit" type="submit" >Войти</button>
      </form>
    </section>

    <InfoTooltip name="info" isOpen={props.isOpen} onClose={props.onClose} isSuccess={false} />
    </>
  )
}