import React, { useState } from "react";
import walkPetLogo from "../../assets/walkpet.png";
import { useUser } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img src={walkPetLogo} alt="walkpet logo" className="header-logo" />
        </Link>

        <nav className="nav-desktop">
          <ul>
            <li>
              <Link to="/" className="link-header">
                Início
              </Link>
            </li>
            <li>
              <Link to="/Passeadores" className="link-header">
                Passeadores
              </Link>
            </li>
            <li>
              <Link to="/contato" className="link-header">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="link-header">
                Sobre
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-right nav-desktop">
          {user ? (
            <>
              <button className="header-perfil-btn">
                <Link to="/perfil" className="header-perfil">
                  <FontAwesomeIcon icon={faUser} />{" "}
                </Link>
              </button>
              <button className="header-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-login">
                Entrar
              </Link>
              <button className="header-register-btn">
                <Link to="/cadastro" className="header-register">
                  Cadastrar
                </Link>
              </button>
            </>
          )}
        </div>

        <button className="hamburger-btn" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={drawerOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <ul className="drawer-links">
          <li>
            <Link to="/" onClick={toggleDrawer}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/Passeadores" onClick={toggleDrawer}>
              Passeadores
            </Link>
          </li>
          <li>
            <Link to="/contato" onClick={toggleDrawer}>
              Contato
            </Link>
          </li>
          <li>
            <Link to="/sobre" onClick={toggleDrawer}>
              Sobre
            </Link>
          </li>
        </ul>
        <div className="drawer-auth">
          {user ? (
            <>
              <button className="drawer-perfil-btn">
                <Link to="/perfil" onClick={toggleDrawer}>
                  <FontAwesomeIcon icon={faUser} /> Perfil
                </Link>
              </button>
              <button className="drawer-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="drawer-login" onClick={toggleDrawer}>
                Entrar
              </Link>
              <button className="drawer-register-btn">
                <Link to="/cadastro" onClick={toggleDrawer}>
                  Cadastrar
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
      {drawerOpen && (
        <div className="drawer-overlay" onClick={toggleDrawer}></div>
      )}
    </header>
  );
};

export default Header;
