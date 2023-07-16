import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__info'>
          <img
            src={currentUser.avatar}
            className='profile__avatar'
            alt={currentUser.name}
          />
          <button
            type='button'
            className='profile__edit-avatar-button'
            onClick={props.onEditAvatar}
          ></button>
          <div className='profile__personage'>
            <div className='profile__rename'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                className='profile__edit-button'
                type='button'
              ></button>
            </div>
            <p className='profile__vocation'>{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className='profile__add-button'
          type='button'
        ></button>
      </section>
      <section className='elements'>
        <ul className='elements__grid'>
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
