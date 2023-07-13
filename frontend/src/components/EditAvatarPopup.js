import React, { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        required
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="url"
        ref={avatarRef}
      />
      <span className="popup__item-error popup__item-error_area_link"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
