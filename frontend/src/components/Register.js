import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue);
  };

  return (
    <div className="entry-forms">
      <p className="entry-forms__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="entry-forms__form">
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          className="entry-forms__form_input"
          placeholder="Email"
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          className="entry-forms__form_input"
          placeholder="Пароль"
          onChange={handleChange}
        />

        <button type="submit" className="entry-forms__button">
          Зарегистрироваться
        </button>
      </form>
      <div className="entry-forms__question">
        <div>Уже зарегистрированы?</div>
        <Link to="/sign-in" className="entry-forms__question_link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
