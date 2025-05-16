import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <a className="navbar-brand" href="#hero">Mentor Hub</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#hero">Início</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mentoring-management">Gerenciar Mentoria</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/feedback">Feedback</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;