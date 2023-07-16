//cards
export const elementTemplate = '.element__template';
export const cardSection = '.elements__grid';

//validation
export const validationProperties = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__item-error_active',
};

export const config = {
  url: 'http://api.melomori.nomoredomains.xyz',
  // url: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
