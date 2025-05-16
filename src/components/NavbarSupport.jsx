import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

const NavbarSupport = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Aqui você pode limpar tokens, sessionStorage, etc.
    logout(); // exemplo
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">Mentor Hub</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/users-support">Usuários</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mentorings">Mentorias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">Contatos</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSupport;
