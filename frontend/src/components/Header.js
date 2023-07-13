import React from "react";
import logo from "../images/Vector_logo.svg";
import { Link, useLocation, Route, Routes, Navigate } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <div
        className={
          isLoggedIn
            ? "header__container"
            : "header__container header__container_logged-out"
        }
      >
        <img src={logo} className="header__logo" alt="Логотип Место.Россия" />

        {location.pathname === "/sign-in" && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}
        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}

        {isLoggedIn && (
          <>
            <p className="header__user-email">{userEmail}</p>
            <a className="header__link header__link_logout" onClick={onSignOut}>
              Выйти
            </a>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
