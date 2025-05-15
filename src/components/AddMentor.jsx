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
  const [role, setRole] = useState("");

  const { id } = useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    areasOfActivity: "",
    currentCompany: "",
    certificates: "",
    occupation: "",
    role: "",
  });

  function pageTitle() {
    return (
      <h2 className="text-center text-light fw-bold mb-4">
        {id ? "Atualizar Mentor" : "Cadastrar Novo Mentor"}
      </h2>
    );
  }

  function showDropdown() {
    if(id) {
      return (
        <div className="mb-3">
          <label className="form-label">Papel</label>
          <select
            className="form-select custom-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Selecione um papel</option>
            <option value="MENTOR">Mentor</option>
            <option value="MENTORADO">Mentorado</option>
            <option value="SUPORTE">Suporte</option>
          </select>
        </div>
      )
    }
    
  }

  function handleSubmit(e) {
    e.preventDefault(); // Impede reload do formulário

    const newErrors = {};

    if (!name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!email.trim()) newErrors.email = "Email é obrigatório.";
    if (!password.trim()) newErrors.password = "Senha é obrigatória.";
    if (!areasOfActivity.trim()) newErrors.areasOfActivity = "Áreas de atuação são obrigatórias.";
    if (!currentCompany.trim()) newErrors.currentCompany = "Empresa atual é obrigatória.";
    if (!certificates.trim()) newErrors.certificates = "Certificados são obrigatórios.";
    if (!occupation.trim()) newErrors.occupation = "Ocupação é obrigatória.";
    if (id && !role.trim()) newErrors.role = "Papel é obrigatório.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Se houver erros, não envia
    }

    const bodyData = {
      name,
      email,
      password,
      areasOfActivity,
      currentCompany,
      certificates,
      occupation,
      role
    };

    if(!id) {
      bodyData.role = "Mentor";
    }

    const url = id
      ? `http://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/${id}`
      : `http://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users`;

    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta:", data);
        navigator("/users/mentor");
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        fetch(`https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json(); // converte a resposta para JSON
          })
          .then(data => {
            console.log('Dados recebidos:', data);
            setName(data.name);
            setEmail(data.email);
            setPassword(data.password);
            setAreasOfActivity(data.areasOfActivity);
            setCurrentCompany(data.currentCompany);
            setCertificates(data.certificates);
            setOccupation(data.occupation);
            setRole(data.role);
          })
          .catch(error => {
            console.error('Erro ao chamar API:', error);
          });

        
      };

      fetchData();
    }
  }, [id]);

  return (
    <>
      <style>{`
        .form-select.custom-select {
          background-color: #2b2d42;
          border: 1px solid #444;
          color: #fff;
          border-radius: 0.5rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-select.custom-select:focus {
          border-color: #7f5af0;
          box-shadow: 0 0 0 0.2rem rgba(127, 90, 240, 0.25);
          background-color: #3b3f58;
        }
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
            <form onSubmit={ handleSubmit }>
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
                  className={`form-control custom-input ${errors.areasOfActivity ? "is-invalid" : ""}`}
                  value={areasOfActivity}
                  onChange={(e) => setAreasOfActivity(e.target.value)}
                />
                {errors.areasOfActivity && <div className="invalid-feedback">{errors.areasOfActivity}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Empresa Atual</label>
                <input
                  type="text"
                  placeholder="Ex: Microsoft"
                  className={`form-control custom-input ${errors.currentCompany ? "is-invalid" : ""}`}
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                />
                {errors.currentCompany && <div className="invalid-feedback">{errors.currentCompany}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Certificados</label>
                <input
                  type="text"
                  placeholder="Ex: CCIE, HCIE"
                  className={`form-control custom-input ${errors.certificates ? "is-invalid" : ""}`}
                  value={certificates}
                  onChange={(e) => setCertificates(e.target.value)}
                />
                {errors.certificates && <div className="invalid-feedback">{errors.certificates}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Ocupação</label>
                <input
                  type="text"
                  placeholder="Ex: Líder de Equipe"
                  className={`form-control custom-input ${errors.occupation ? "is-invalid" : ""}`}
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
                {errors.occupation && <div className="invalid-feedback">{errors.occupation}</div>}
              </div>

              {showDropdown()}
              {errors.role && <div className="invalid-feedback d-block">{errors.role}</div>}

              <button type="submit" className="btn btn-gradient w-100 mt-3">
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
