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
  // url: "https://mesto.nomoreparties.co/v1/cohort-63",
  url: 'api.melomori.nomoredomains.xyz',
  headers: {
    // authorization: "12dd9e74-5d63-45ab-b340-1203c962dc2b",
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
