// export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
// export const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
// export const popupEditProfileTitle = popupEditProfileForm.querySelector('.popup__input-text_profile_name');
// export const popupEditProfileDescription = popupEditProfileForm.querySelector('.popup__input-text_profile_description');
// export const popupEditCardBtn = popupEditProfileForm.querySelector('.popup__submit');

// export const popupAddCard = document.querySelector('.popup_type_add-card');
// export const popupAddCardForm = popupAddCard.querySelector('.popup__form');
// export const popupAddCardBtn = popupAddCardForm.querySelector('.popup__submit');

// export const popupEditAvatar = document.querySelector('.popup_type_avatar');
// export const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form');
// export const popupEditAvatarBtn = popupEditAvatarForm.querySelector('.popup__submit');

// export const profileEditButton = document.querySelector('.profile__edit-button');
// export const profileAddButton = document.querySelector('.profile__add-button');
// export const profileEditAvatar = document.querySelector('.profile__btn-av-container');

// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: new URL('../images/arkhyz.jpg', import.meta.url)
//   },
//   {
//     name: 'Челябинская область',
//     link: new URL('../images/chelyabinsk-oblast.jpg', import.meta.url)
//   },
//   {
//     name: 'Иваново',
//     link: new URL('../images/ivanovo.jpg', import.meta.url)
//   },
//   {
//     name: 'Камчатка',
//     link: new URL('../images/kamchatka.jpg', import.meta.url)
//   },
//   {
//     name: 'Холмогорский район',
//     link: new URL('../images/kholmogorsky-rayon.jpg', import.meta.url)
//   },
//   {
//     name: 'Байкал',
//     link: new URL('../images/baikal.jpg', import.meta.url)
//   }
// ]; 

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input-text_type_error',
  errorActiveClass: 'popup__input-error_active',
  submitButtonInactiveClass: 'popup__submit_inactive'
};

export const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    'Content-type': 'application/json',
    'authorization': "fde5bb74-e309-4d0b-b20e-21b47420feea"
  }
}