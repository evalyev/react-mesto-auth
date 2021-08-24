import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleTrashClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <div className="element__image-container">
        <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        { isOwn &&
          <button className="element__trash" type="button" aria-label="Кнопка удалить" onClick={handleTrashClick} ></button>
        }
      </div>
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className={cardDeleteButtonClassName} type="button" aria-label="Кнопка лайкнуть" onClick={handleLikeClick} ></button>
          <span className="element__like-amount">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}