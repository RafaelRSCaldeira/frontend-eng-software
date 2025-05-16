import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Login() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light position-relative">
      {/* Botão de Voltar */}
      <Link
        to="/"
        className="position-absolute top-0 start-0 m-4 btn btn-outline-light d-flex align-items-center gap-2"
        style={{ zIndex: 10 }}
        data-aos="fade-down"
      >
        <i className="bi bi-arrow-left"></i> Voltar
      </Link>

      <div className="row justify-content-center w-100">
        <div className="col-lg-7 col-md-8 col-sm-10">
          <div
            className="card shadow-lg border-0 rounded-4 bg-dark text-light"
            data-aos="zoom-in"
          >
            <div className="card-body p-5 text-center">
              <h2 className="card-title mb-4 fw-bold" data-aos="fade-up">
                Escolha seu tipo de login
              </h2>
              <p className="mb-4" data-aos="fade-up" data-aos-delay="100">
                Seja um mentor, mentorado ou suporte. Escolha abaixo a sua opção.
              </p>
              <div
                className="d-flex justify-content-around mb-4 flex-wrap gap-3"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Link
                  to="/login-page"
                  state={{ user: "Mentor" }}
                  className="btn btn-outline-light btn-lg px-5 py-3 w-45 border-2 rounded-3"
                >
                  Login de Mentor
                </Link>
                <Link
                  to="/login-page"
                  state={{ user: "Mentorado" }}
                  className="btn btn-outline-light btn-lg px-5 py-3 w-45 border-2 rounded-3"
                >
                  Login de Mentorado
                </Link>
                <Link
                  to="/login-page"
                  state={{ user: "Suporte" }}
                  className="btn btn-outline-light btn-lg px-5 py-3 w-45 border-2 rounded-3"
                >
                  Login de Suporte
                </Link>
              </div>

              {/* ✅ Botão de Cadastrar */}
              <div data-aos="fade-up" data-aos-delay="400">
                <p className="mb-2">Ainda não possui uma conta?</p>
                <Link to="/register" className="btn btn-info fw-bold">
                  Cadastrar-se
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
