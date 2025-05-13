import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddMentor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [areasOfActivity, setAreasOfActivity] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [certificates, setCertificates] = useState("");
  const [occupation, setOccupation] = useState("");

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
        {id ? "Atualizar Mentor" : "Cadastrar Novo Mentor"}
      </h2>
    );
  }

  useEffect(() => {
    if (id) {
      // Substitua isso por uma chamada à API real, como fetch(`/api/mentores/${id}`)
      const fetchData = async () => {
        const mockMentor = {
          id: id,
          name: "João Silva",
          email: "joao@email.com",
          password: "senhaSegura123", // cuidado: em produção, a senha não vem da API
          areas_of_activity: ["Cybersegurança", "Redes de Computadores"],
          current_company: "Microsoft",
          certificates: ["CCIE", "HCIE"],
          occupation: "Líder de Equipe"
        };

        setName(mockMentor.name);
        setEmail(mockMentor.email);
        setPassword(mockMentor.password);
        setAreasOfActivity(mockMentor.areas_of_activity.join(", "));
        setCurrentCompany(mockMentor.current_company);
        setCertificates(mockMentor.certificates.join(", "));
        setOccupation(mockMentor.occupation);
      };

      fetchData();
    }
  }, [id]);

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
                  placeholder="Digite o nome do mentor"
                  className={`form-control custom-input ${errors.name ? "is-invalid" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Digite o e-mail do mentor"
                  className={`form-control custom-input ${errors.email ? "is-invalid" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  placeholder="Digite a senha"
                  className={`form-control custom-input ${errors.password ? "is-invalid" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Áreas de Atuação</label>
                <input
                  type="text"
                  placeholder="Ex: Cybersegurança, Redes de Computadores"
                  className="form-control custom-input"
                  value={areasOfActivity}
                  onChange={(e) => setAreasOfActivity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Empresa Atual</label>
                <input
                  type="text"
                  placeholder="Ex: Microsoft"
                  className="form-control custom-input"
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Certificados</label>
                <input
                  type="text"
                  placeholder="Ex: CCIE, HCIE"
                  className="form-control custom-input"
                  value={certificates}
                  onChange={(e) => setCertificates(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Ocupação</label>
                <input
                  type="text"
                  placeholder="Ex: Líder de Equipe"
                  className="form-control custom-input"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>

              <button className="btn btn-gradient w-100 mt-3"
              onClick={() => navigator("/users/mentor")}>
                {id ? "Atualizar" : "Cadastrar"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary mt-2 ms-2"
                onClick={() => navigator("/users/mentor")}
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

export default AddMentor;
