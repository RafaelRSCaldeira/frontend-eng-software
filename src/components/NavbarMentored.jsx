import React from "react";
import { Link } from 'react-router-dom';

const NavbarMentored = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <a className="navbar-brand" href="#hero">Mentor Hub</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home-support">Painel de Gerenciamento</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mentorings-support">Mentorias</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contacts-support">Contatos</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavbarMentored;
