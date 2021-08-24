import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

export default function AddPlacePopup(props) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link
    })
      .then(res => {
        setTitle('');
        setLink('');
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" isOpen={props.isOpen} btnText="Создать" onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input-text popup__input-text_profile_name" id="input-text-name-card" type="text" placeholder="Название"
        value={title} name="edit-form-name" minLength="2" maxLength="30" required onChange={handleTitleChange} />
      <span className="input-text-name-card-error popup__input-error"></span>
      <input className="popup__input-text popup__input-text_profile_description" id="input-text-url" type="url"
        value={link} placeholder="Ссылка на картинку" name="edit-form-description" required onChange={handleLinkChange} />
      <span className="input-text-url-error popup__input-error"></span>
    </PopupWithForm>
  )
}