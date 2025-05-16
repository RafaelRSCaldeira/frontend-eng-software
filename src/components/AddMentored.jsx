import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddMentored = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    interests: "",
  });

  function pageTitle() {
    return (
      <h2 className="text-center text-light fw-bold mb-4">
        {id ? "Atualizar Mentorado" : "Cadastrar Novo Mentorado"}
      </h2>
    );
  }

  // Validação simples dos campos
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!email.trim()) newErrors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido.";
    if (!password.trim()) newErrors.password = "Senha é obrigatória.";
    if (!interests.trim()) newErrors.interests = "Interesse é obrigatório.";
    return newErrors;
  };

  // Função para enviar dados à API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      name,
      email,
      role: "Mentorado",
      areasOfActivity: interests,
    };

    if (!id) {
      payload.password = password;
    }

    try {
      const url = id
        ? `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/${id}`
        : `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users`;

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Aqui pode tratar erros vindos da API, por exemplo:
        console.error("Erro na API:", errorData);
        return;
      }

      navigate("/users/mentored");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  useEffect(() => {
    if (id) {
      // Substitua pela chamada real à API
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/${id}`
          );
          if (!response.ok) throw new Error("Erro ao carregar dados");

          const data = await response.json();

          setName(data.name || "");
          setEmail(data.email || "");
          setPassword(data.password || "");
          setInterests(
            Array.isArray(data.interests) ? data.interests.join(", ") : ""
          );
        } catch (error) {
          console.error("Erro:", error);
        }
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
          
        .form-select.custom-select {
          background-color: #2b2d42;
          border: 1px solid #444;
          color: #fff;
          border-radius: 0.5rem;
          transition: border-color 0.3s, box-shadow 0.3s;
          width: 100%;
        }

        .form-select.custom-select:focus {
          border-color: #7f5af0;
          box-shadow: 0 0 0 0.2rem rgba(127, 90, 240, 0.25);
          background-color: #3b3f58;
        }
      `}</style>

      <div className="page-background">
        <div className="card custom-card p-4">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  placeholder="Digite o nome do mentorado"
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
                  placeholder="Digite o e-mail"
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

              {!id && (
                <div className="mb-3">
                  <label className="form-label text-light">Senha</label>
                  <input
                    type="password"
                    className={`form-control custom-input ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              )}

              {/* Áreas de Interesse */}
              <div className="mb-3">
                <label className="form-label text-light">
                  Áreas de Interesse
                </label>
                <select
                  className={`form-select custom-select ${
                    errors.interests ? "is-invalid" : ""
                  }`}
                  name="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                >
                  <option value="">Selecione uma área</option>
                  <option value="Desenvolvimento Frontend">
                    Desenvolvimento Frontend
                  </option>
                  <option value="Desenvolvimento Backend">
                    Desenvolvimento Backend
                  </option>
                  <option value="DevOps">DevOps</option>
                  <option value="UX/UI Design">UX/UI Design</option>
                  <option value="Análise de Dados">Análise de Dados</option>
                  <option value="Inteligência Artificial">
                    Inteligência Artificial
                  </option>
                  <option value="Segurança da Informação">
                    Segurança da Informação
                  </option>
                  <option value="Computação em Nuvem">
                    Computação em Nuvem
                  </option>
                </select>
                {errors.interests && (
                  <div className="invalid-feedback">{errors.interests}</div>
                )}
              </div>

              <button type="submit" className="btn btn-gradient w-100 mt-3">
                {id ? "Atualizar" : "Cadastrar"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary mt-2 ms-2"
                onClick={() => navigate("/users/mentored")}
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

export default AddMentored;
