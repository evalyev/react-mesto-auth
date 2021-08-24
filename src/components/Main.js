import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser?.avatar} alt="Аватар пользователя" />
            <div className="profile__btn-av-container" onClick={props.onEditAvatar}>
              <button className="profile__btn-avatar" type="button" aria-label="Кнопка редактирования аватара"></button>
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__two-columns">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Кнопка редактирования профиля" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser?.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Кнопка добавления карточки" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">

        {
          props.cards.map(card => {

            return (
              <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
            )
          })}


      </section>
    </main>
  )
}

export default Main;