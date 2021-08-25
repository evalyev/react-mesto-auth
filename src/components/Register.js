import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function Register(props) {
  const loggedIn = React.useContext(AppContext)
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

    props.onRegister(email, password)
      .then(res => {
        if(res) {
          setEmail("");
          setPassword("");
        }
      })

  }

  return (
    <>
      {loggedIn && <Redirect to="/" />}
      <section className="authoriz">
        <h1 className="authoriz__title">Регистрация</h1>
        <form className="authoriz__form" name="reg" onSubmit={handleSubmit}>
          <input className="authoriz__input-text" name="e-mail" type="e-mail" value={email} placeholder="Email" onChange={changeEmail}></input>
          <input className="authoriz__input-text" name="password" type="password" value={password} placeholder="Пароль" onChange={changePassword}></input>
          <button className="authoriz__btn-submit" type="submit" >Зарегистрироваться</button>
        </form>
        <Link className="authoriz__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </section>
    </>
  )
}