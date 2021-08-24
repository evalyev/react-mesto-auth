import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} btnText="Сохранить" onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input-text popup__input-text_profile_name" id="input-text-name" type="text" value={name}
        placeholder="Ваше имя" name="edit-form-name" minLength="2" maxLength="40" required onChange={handleNameChange} />
      <span className="input-text-name-error popup__input-error"></span>
      <input className="popup__input-text popup__input-text_profile_description" id="input-text-description" type="text" value={description}
        placeholder="Описание" name="edit-form-description" minLength="2" maxLength="200" required onChange={handleDescriptionChange} />
      <span className="input-text-description-error popup__input-error"></span>
    </PopupWithForm>
  )
}