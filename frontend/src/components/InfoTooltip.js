import React from "react";

function InfoTooltip({ isOpen, image, onClose, infoTooltipMessage }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img className="popup__info-image" alt="Изображение" src={image} />

        <p className="popup__message">{infoTooltipMessage}</p>

        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
