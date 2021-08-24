import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  } 

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} btnText="Сохранить" onClose={props.onClose} onSubmit={handleSubmit}>
        <input className="popup__input-text popup__input-text_profile_description" id="input-link-url" type="url"
          placeholder="Ссылка на картинку" name="edit-form-description" required ref={inputRef} />
        <span className="input-text-url-error popup__input-error input-link-url-error"></span>
      </PopupWithForm>
  )
}