import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter, useHistory, Redirect} from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoToolTip from './InfoTooltip';
import Footer from './Footer';
import api from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { setToken, getToken, removeToken } from '../utils/token';
import * as auth from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [cardDelete, setCardDelete] = useState('')
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tokenCheck = () => {
    const jwt = getToken('jwt');

    if(!jwt) {
      return;
    }

    auth.checkToken(jwt)
    .then((res) => {
      setLoggedIn(true);
      history.push('/');
      setUserEmail(res.data.email)
    })
    .catch((err) => {
      setLoggedIn(false);
      if(err.status === 401) {
        console.log(`Ошибка с кодом ${err.status} - Переданный токен некорректен`);
      } else {
        console.log(err);
      }
    });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleLogin = (userEmail, userPassword) => {
    auth.authorize(userEmail, userPassword)
    .then((data) => {
      setToken(data.token)
      setLoggedIn(true);
      setUserEmail(userEmail);
      history.push('/');
    })
    .catch((err) => {
      setSuccess(false);
      setInfoToolTipOpen(true);
      if(err.status === 400) {
        console.log(`Ошибка с кодом ${err.status} - не передано одно из полей`);
      } else if(err.status === 401) {
        console.log(`Ошибка с кодом ${err.status} - пользователь с email не найден`);
      } else {
        console.log(err);
      }
    });
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    removeToken('jwt');
  };

  const handleRegister = (userEmail, userPassword) => {
    auth.register(userEmail, userPassword)
      .then(() => {
        history.push('/signin');
        setSuccess(true);
        setInfoToolTipOpen(true);
      })
      .catch((err) => {
        setSuccess(false);
        setInfoToolTipOpen(true);
        if(err.status === 400) {
          console.log(`Ошибка с кодом ${err.status} - не корректно заполнено одно из полей`);
        } else {
          console.log(err);
        }
      });
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setDeleteCardPopupOpen(true);
    setCardDelete(card)
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(false);
    setDeleteCardPopupOpen(false);
    setInfoToolTipOpen(false);
    setLoading(false);
  };

  const handleUpdateUser = (newUserInfo) => {
    setLoading(true);
    api.sendUserInfo(newUserInfo)
      .then((user) => {
          setCurrentUser(user);
          closeAllPopups();
      })
      .catch((err) => {
          console.log(err);
      });
  };

  const handleUpdateAvatar = (newAvatarLink) => {
    setLoading(true);
    api.sendUserAvatar(newAvatarLink)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const handleLikeCards = (newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }

    const changeLike = () => {
      if(!isLiked) {
        api.likeCard(card._id)
          .then((newCard) => {
            handleLikeCards(newCard);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.deleteLikeCard(card._id)
          .then((newCard) => {
            handleLikeCards(newCard);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    changeLike();
  };

  const handleCardDelete = (card) => {
    setLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    setLoading(true);
    api.sendCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return(
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>

            <Route>
              <InfoToolTip
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                isSuccess={isSuccess}
              />
            </Route>

            <Switch>

              <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                <Header
                  userEmail={userEmail}
                  loggedIn={loggedIn}
                  onSignOut={handleLogOut}
                  linkTo="/signin"
                  linkName="Выйти"
                />
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onDeleteCardClick={handleDeleteCardClick}
                  cards={cards}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  isLoading={isLoading}
                />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isLoading}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  isLoading={isLoading}
                />
                <DeleteCardPopup
                  card={cardDelete}
                  isOpen={isDeleteCardPopupOpen}
                  onClose={closeAllPopups}
                  onCardDelete={handleCardDelete}
                  isLoading={isLoading}
                />
                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                />
                <Footer />
              </ProtectedRoute>

              <Route path="/signin">
                <Header
                  userEmail=''
                  loggedIn={loggedIn}
                  onSignOut={handleLogOut}
                  linkTo="/signup"
                  linkName="Регистрация"
                />
                <Login
                  onLogin={handleLogin}
                />
              </Route>

              <Route path="/signup">
                < Header
                  userEmail=''
                  loggedIn={loggedIn}
                  onSignOut={handleLogOut}
                  linkTo="/signin"
                  linkName="Войти"
                />
                <Register
                  onRegister={handleRegister}
                />
              </Route>

            </Switch>
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
