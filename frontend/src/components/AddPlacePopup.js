import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleCardName = (evt) => {
    setName(evt.target.value);
  };

  const handleCardLink = (evt) => {
    setLink(evt.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="new-foto"
      title="Новое место"
      isOpen={isOpen}
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name || ""}
        onChange={handleCardName}
      />
      <span className="popup__item-error popup__item-error_area_name"></span>
      <input
        className="popup__input"
        type="url"
        id="placeUrl"
        name="link"
        value={link || ""}
        placeholder="Ссылка на картинку"
        required
        onChange={handleCardLink}
      />
      <span className="popup__item-error popup__item-error_area_link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
