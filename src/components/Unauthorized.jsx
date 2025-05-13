import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-dark text-white"
      style={{ height: "100vh" }}
    >
      <h1 className="mb-4" data-aos="fade-down">Acesso Negado</h1>
      <p className="mb-4 text-center" data-aos="fade-up">
        Você não tem permissão para acessar esta página. Faça login com uma conta autorizada.
      </p>
      <Link
        to="/login"
        className="btn btn-outline-light btn-lg px-5 py-3"
        data-aos="zoom-in"
      >
        Voltar para a Página de Login
      </Link>
    </div>
  );
}

export default Unauthorized;
