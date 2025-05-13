import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  function pageTitle() {
    return (
      <h2 className="text-center text-light fw-bold mb-4">
        {id ? "Atualizar Gerente" : "Cadastrar Novo Gerente"}
      </h2>
    );
  }

  return (
    <>
      <style>{`
        .page-background {
          background-color: #121212;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .custom-card {
          background-color: #1a1a2e;
          border: none;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 600px;
        }

        .form-control.custom-input {
          background-color: #2b2d42;
          border: 1px solid #444;
          color: #fff;
          border-radius: 0.5rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-control.custom-input::placeholder {
          color: #ffffff;
          opacity: 1; /* ou ajuste para 0.7 se quiser um leve cinza */
        }

        .form-control.custom-input:focus {
          border-color: #7f5af0;
          box-shadow: 0 0 0 0.2rem rgba(127, 90, 240, 0.25);
          background-color: #3b3f58;
        }

        .form-label {
          color: #cfd2dc;
          font-weight: 500;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #7f5af0, #00cfe8);
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 0.5rem;
        }

        .btn-gradient:hover {
          opacity: 0.9;
        }

        .invalid-feedback {
          color: #ff6b6b;
        }
      `}</style>

      <div className="page-background">
        <div className="card custom-card p-4">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Digite o nome do gerente"
                  className={`form-control custom-input ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do gerente"
                  className={`form-control custom-input ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Digite a senha"
                  className={`form-control custom-input ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <button className="btn btn-gradient w-100 mt-3"
              onClick={() => navigator("/users/mentored")}>
                {id ? "Atualizar" : "Cadastrar"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary mt-2 ms-2"
                onClick={() => navigator("/users/support")}
              >
                ← Voltar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSupport;
