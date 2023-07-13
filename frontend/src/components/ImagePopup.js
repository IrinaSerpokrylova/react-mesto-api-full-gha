import React from 'react';

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_open-image ${
        props.card.link ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__image-container'>
        <button
          className='popup__close'
          type='button'
          onClick={props.onClose}
        ></button>
        <img
          className='popup__image-opened'
          src={props.card.link}
          alt={props.card.name}
        />
        <p className='popup__image-caption'>{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
