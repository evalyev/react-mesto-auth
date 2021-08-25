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
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from "../utils/auth";
import InfoTooltip from './InfoTooltip';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipPopupSuccess, setIsInfoTooltipPopupSuccess] = useState(false);
  const [isLoggOut, setIsLoggOut] = useState(false);


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

  function onInfoTooltip(isSuccess) {
    setIsInfoTooltipPopupOpen(true);
    setIsInfoTooltipPopupSuccess(isSuccess);
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
        setCurrentUser({...currentUser, name: res.name, about: res.about});
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data.avatar)
      .then(newUserInfo => {
        setCurrentUser({...currentUser, avatar: newUserInfo.avatar});
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

  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(res => {
        if (res) {
          onInfoTooltip(true);
          return true;
        }
        else {
          onInfoTooltip(false);
          return false;
        }
      })
      .catch(error => {
        console.log(error);
        onInfoTooltip(false);
      })

  }

  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggOut(!isLoggOut);
          return true;
        }
      })
      .catch(err => {
        onInfoTooltip(false);
        console.log(err); // запускается, если пользователь не найден
      })
  }

  function handleExit() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setIsLoggOut(!isLoggOut);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Promise.all([api.getUserInfo(), api.getInitialCards(), auth.getContent(token)])
        .then(([userInfo, cardItems, authInfo]) => {
          if (authInfo.data) {
            authInfo = authInfo.data;
            userInfo.email = authInfo.email;
            setCurrentUser(userInfo);
            setCards(cardItems);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }

  }, [isLoggOut]);

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <AppContext.Provider value={loggedIn} >
        <Header onExit={handleExit} />

        {/* <Main onEditProfile={onEditProfile} onEditAvatar={onEditAvatar} onAddPlace={onAddPlace} onCardClick={handleCardClick}
                cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} /> */}

        <ProtectedRoute
          onEditProfile={onEditProfile} onEditAvatar={onEditAvatar} onAddPlace={onAddPlace} onCardClick={handleCardClick}
          cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
          component={Main} path="/"
        />

        <Route path="/sign-in">
          <Login onClose={handlePopupClose} isOpen={isInfoTooltipPopupOpen} onOpen={onInfoTooltip} onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onClose={handlePopupClose} isOpen={isInfoTooltipPopupOpen} onOpen={onInfoTooltip} onRegister={handleRegister} />
        </Route>

        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handlePopupClose} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handlePopupClose} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name="delete" title="Вы уверены?" btnText="Да" onClose={handlePopupClose} />
        <ImagePopup card={selectedCard} onClose={handlePopupClose} isOpen={isImagePopupOpen} />

        <InfoTooltip name="info" isOpen={isInfoTooltipPopupOpen} onClose={handlePopupClose} isSuccess={isInfoTooltipPopupSuccess} />

      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

