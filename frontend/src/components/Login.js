import React, { useState } from "react";

function Login({ onAuth }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAuth(userData);
  };

  return (
    <div className="entry-forms">
      <h2 className="entry-forms__title">Вход</h2>
      <form className="entry-forms__form" onSubmit={handleSubmit}>
        <input
          className="entry-forms__form_input"
          name="email"
          type="email"
          id="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          className="entry-forms__form_input"
          name="password"
          type="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />

        <button className="entry-forms__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
