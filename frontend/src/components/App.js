import CurrentUserContext from '../contexts/CurrentUserContext';
import '../index.css';
import api from '../utils/Api';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header.js';
import ImagePopup from './ImagePopup';
import Main from './Main';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
// import NavBar from "./NavBar";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import imageSuccess from '../images/sucess.svg';
import imageError from '../images/error.svg';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth.js';

function App() {
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // Новый функционал, попапы ошибки и успеха авторизации и тд
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          console.log(cards);
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [isLoggedIn]);

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  //обновление аватарки

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  // Check jwt

  function checkToken() {
    // const token = localStorage.getItem("jwt");

    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  // Registration

  function handleRegister(registerData) {
    auth
      .register(registerData)
      .then(() => {
        setInfoTooltipImage(imageSuccess);
        setInfoTooltipMessage('Вы успешно зарегистрировались!');
        setInfoTooltipOpen(true);

        navigate('sign-in', { replace: true });
      })
      .catch((err) => {
        setInfoTooltipImage(imageError);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipOpen(true);

        console.log(`Ошибка ${err}`);
      });
  }

  // Authorization

  function handleLogin(loginData) {
    auth
      .authorize(loginData)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          // localStorage.setItem('jwt', res.token);
          setUserEmail(loginData.email);

          navigate('/');
        }
      })
      .catch((err) => {
        setInfoTooltipImage(imageError);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipOpen(true);

        console.log(`Ошибка ${err}`);
      });
  }

  // Signout, remove jwt from local storage

  function handleSignOut() {
    console.log([document.cookie.split(';')]);

    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <Header
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
            onSignOut={handleSignOut}
          />

          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  element={
                    <Main
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      cards={cards}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/sign-up'
              element={<Register onRegister={handleRegister} />}
            />
            <Route path='/sign-in' element={<Login onAuth={handleLogin} />} />
            <Route path='/*' element={<Navigate to='/sign-in' replace />} />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            image={infoTooltipImage}
            infoTooltipMessage={infoTooltipMessage}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
