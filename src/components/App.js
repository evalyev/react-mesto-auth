import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);


  const [selectedCard, setSelectedCard] = useState(null);

  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function onInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closeAllPopups();
    }
  }

  function closeAllPopups(evt) {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
      .then(res => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data.avatar)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.removeCard(card._id)
      .then((res) => {
        setCards(cards.filter(item => item._id !== card._id))
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(card) {
    return api.addCard(card.name, card.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cardItems]) => {
        setCurrentUser(userInfo);
        setCards(cardItems);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <AppContext.Provider value={loggedIn} >
        <Header />

        {/* <Main onEditProfile={onEditProfile} onEditAvatar={onEditAvatar} onAddPlace={onAddPlace} onCardClick={handleCardClick}
                cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} /> */}

        <ProtectedRoute
          onEditProfile={onEditProfile} onEditAvatar={onEditAvatar} onAddPlace={onAddPlace} onCardClick={handleCardClick}
          cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
          component={Main} path="/"
        />



        {/* <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handlePopupClose} onUpdateUser={handleUpdateUser} /> */}

        <ProtectedRoute
          isOpen={isEditProfilePopupOpen} onClose={handlePopupClose} onUpdateUser={handleUpdateUser}
          component={EditProfilePopup} path="/"
        />

        {/* <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose} onUpdateAvatar={handleUpdateAvatar} /> */}

        <ProtectedRoute
          isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose} onUpdateAvatar={handleUpdateAvatar}
          component={EditAvatarPopup} path="/"
        />

        {/* <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handlePopupClose} onAddPlace={handleAddPlaceSubmit} /> */}

        <ProtectedRoute
          isOpen={isAddPlacePopupOpen} onClose={handlePopupClose} onAddPlace={handleAddPlaceSubmit}
          component={AddPlacePopup} path="/"
        />

        {/* <PopupWithForm name="delete" title="Вы уверены?" btnText="Да" onClose={handlePopupClose} /> */}

        <ProtectedRoute
          name="delete" title="Вы уверены?" btnText="Да" onClose={handlePopupClose}
          component={PopupWithForm} path="/"
        />

        {/* <ImagePopup card={selectedCard} onClose={handlePopupClose} isOpen={isImagePopupOpen} /> */}

        <ProtectedRoute
          card={selectedCard} onClose={handlePopupClose} isOpen={isImagePopupOpen}
          component={ImagePopup} path="/"
        />

        <Route path="/sign-in">
          <Login onClose={handlePopupClose} isOpen={isInfoTooltipPopupOpen} onOpen={setIsInfoTooltipPopupOpen} />
        </Route>
        <Route path="/sign-up">
          <Register onClose={handlePopupClose} isOpen={isInfoTooltipPopupOpen} onOpen={setIsInfoTooltipPopupOpen} />
        </Route>

        <Footer />
        
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

