import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

export default function Login(props) {
  const loggedIn = React.useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          setPassword("");
          props.onLogin();
        }
      })
      .catch(err => {
        props.onOpen();
        console.log(err); // запускается, если пользователь не найден
      })
  }

  return (
    <>
      {loggedIn && <Redirect to="/" />}
      <section className="authoriz">
        <h1 className="authoriz__title">Вход</h1>
        <form className="authoriz__form" name="login" onSubmit={handleSubmit}>
          <input className="authoriz__input-text" name="e-mail" type="e-mail" value={email} placeholder="Email" onChange={changeEmail}></input>
          <input className="authoriz__input-text" name="password" type="password" value={password} placeholder="Пароль" onChange={changePassword}></input>
          <button className="authoriz__btn-submit" type="submit" >Войти</button>
        </form>
      </section>

      <InfoTooltip name="info" isOpen={props.isOpen} onClose={props.onClose} isSuccess={false} />
    </>
  )
}