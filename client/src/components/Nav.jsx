import React from "react";
import SearchBar from "./SearchBar.jsx";
import styles from "../css/Nav.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Nav({ onSearch, onCloseAll }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  function handleRandom() {
    const randomNumber = Math.floor(Math.random() * 827) + 1;
    onSearch(randomNumber);
  }

  const handleLogout = () => {
    logout();
    onCloseAll(); // Limpiar los personajes al cerrar sesión
    navigate("/login");
  };

  return (
    <div className={styles.navbarra}>
      <div className={styles.nav}>
        <NavLink to="/home">
          <button
            className={pathname === "/home" ? styles.buttonOn : styles.button}
            id={styles.home}
          >
            Home
          </button>
        </NavLink>

        <NavLink to="/favorites">
          <button
            className={
              pathname === "/favorites" ? styles.buttonOn : styles.button
            }
            id={styles.home}
          >
            Favorites
          </button>
        </NavLink>

        <NavLink to="/about">
          <button
            className={pathname === "/about" ? styles.buttonOn : styles.button}
            id={styles.about}
          >
            About
          </button>
        </NavLink>

        <SearchBar onSearch={onSearch} onRandom={handleRandom} />

        {auth.token && (
          <div className={styles.userSection}>
            <span className={styles.welcomeMsg}>
              Welcome, {auth.user?.name || "User"}!
            </span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
