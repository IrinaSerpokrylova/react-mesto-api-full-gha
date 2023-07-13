import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
  const card = props.card;

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? 'element__like-button_active' : ''
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className='element'>
      {isOwn && (
        <button className='element__delete' onClick={handleDeleteClick} />
      )}
      <img
        src={card.link}
        className='element__rectangle'
        alt={card.name}
        onClick={handleClick}
      />
      <div className='element__group'>
        <h2 className='element__place'>{card.name}</h2>
        <div className='element__like'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <div className='element__like-calc'>{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
