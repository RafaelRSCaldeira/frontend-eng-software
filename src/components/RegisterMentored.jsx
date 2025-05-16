import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../AuthContext";

function RegisterMentored() {
  const navigate = useNavigate(); // renomeado para "navigate", padrão comum
  const location = useLocation();
  const role = location.state?.role || "Mentorado"; // padrão mais apropriado

  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    pwd: "",
    role: role,
    areasOfInterest: "",
  });

  const [errors, setErrors] = useState({});

  const areasDeInteresse = [
    "Desenvolvimento Frontend",
    "Desenvolvimento Backend",
    "DevOps",
    "UX/UI Design",
    "Análise de Dados",
    "Inteligência Artificial",
    "Segurança da Informação",
    "Computação em Nuvem",
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
      submit: "",
      mail: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, informe seu nome completo.";
    }

    if (!formData.mail.trim()) {
      newErrors.mail = "Por favor, informe seu e-mail.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.mail.trim())
    ) {
      newErrors.mail = "E-mail inválido.";
    }

    if (!formData.pwd) {
      newErrors.pwd = "Por favor, crie uma senha.";
    } else if (formData.pwd.length < 6) {
      newErrors.pwd = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (!formData.areasOfInterest) {
      newErrors.areasOfInterest = "Selecione uma área de interesse.";
    }

    return newErrors;
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(
        "https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/search-by-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.status === 404) {
        return false; // não existe
      }

      if (!response.ok) {
        throw new Error("Erro ao verificar email");
      }

      const data = await response.json();
      return data !== null; // true se existir
    } catch {
      return false; // no erro, assume que não existe pra não bloquear
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const emailExists = await checkEmailExists(formData.mail.trim());
    if (emailExists) {
      setErrors({ mail: "Este e-mail já está cadastrado." });
      return;
    }

    try {
      const response = await fetch(
        "https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.mail,
            password: formData.pwd,
            areasOfActivity: formData.areasOfInterest,
            role: formData.role, // usa o que veio do estado
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const newUser = await response.json();

      login(newUser); // login com os dados retornados do backend (não formData)
      navigate("/users-mentored"); // navega para a página de mentorados
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrors({ submit: "Erro ao cadastrar. Tente novamente mais tarde." });
    }
  };

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
        }

        .page-background {
          background-color: #121212;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .form-control.custom-input {
          background-color: #2b2d42;
          border: 1px solid #444;
          color: #fff;
          border-radius: 0.6rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-control.custom-input:focus {
          border-color: #7f5af0;
          box-shadow: 0 0 0 0.2rem rgba(127, 90, 240, 0.25);
          background-color: #3b3f58;
        }

        .form-control.custom-input::placeholder {
          color: #ffffff;
          opacity: 0.7;
        }

        .custom-card {
          background-color: #1a1a2e;
          border: none;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 600px;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #7f5af0, #00cfe8);
          border: none;
          color: white;
          font-weight: bold;
        }

        .btn-gradient:hover {
          opacity: 0.9;
        }

        .form-label {
          color: #cfd2dc;
          font-weight: 500;
        }

        .error-message {
          color: #ff6b6b;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      `}</style>

      <div className="page-background">
        <div className="card shadow-lg custom-card p-4" data-aos="zoom-in">
          <h2
            className="text-center mb-4 fw-bold text-light"
            data-aos="fade-down"
          >
            Cadastro de Mentorado
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3" data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="name" className="form-label">
                Nome Completo
              </label>
              <input
                type="text"
                className={`form-control custom-input ${
                  errors.name ? "is-invalid" : ""
                }`}
                id="name"
                name="name"
                placeholder="Ex: João da Silva"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

            <div className="mb-3" data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="mail" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className={`form-control custom-input ${
                  errors.mail ? "is-invalid" : ""
                }`}
                id="mail"
                name="mail"
                placeholder="Ex: joao@email.com"
                value={formData.mail}
                onChange={handleChange}
                required
              />
              {errors.mail && (
                <div className="error-message">{errors.mail}</div>
              )}
            </div>

            <div className="mb-3" data-aos="fade-up" data-aos-delay="300">
              <label htmlFor="pwd" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className={`form-control custom-input ${
                  errors.pwd ? "is-invalid" : ""
                }`}
                id="pwd"
                name="pwd"
                placeholder="Crie uma senha segura"
                value={formData.pwd}
                onChange={handleChange}
                required
              />
              {errors.pwd && <div className="error-message">{errors.pwd}</div>}
            </div>

            <div className="mb-4" data-aos="fade-up" data-aos-delay="600">
              <label htmlFor="areasOfInterest" className="form-label">
                Áreas de Interesse
              </label>
              <select
                className={`form-control custom-input ${
                  errors.areasOfInterest ? "is-invalid" : ""
                }`}
                id="areasOfInterest"
                name="areasOfInterest"
                value={formData.areasOfInterest}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma área</option>
                {areasDeInteresse.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.areasOfInterest && (
                <div className="error-message">{errors.areasOfInterest}</div>
              )}
            </div>

            <div
              className="d-flex justify-content-between mb-3"
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/")}
              >
                ← Voltar
              </button>
              <button type="submit" className="btn btn-gradient px-4">
                <i className="bi bi-person-plus-fill me-2"></i>
                Cadastrar Mentorado
              </button>
            </div>
          </form>

          {errors.submit && (
            <div className="text-center error-message mb-3">{errors.submit}</div>
          )}

          <div className="text-center" data-aos="fade-up" data-aos-delay="800">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => navigate("/login")}
            >
              Já tem uma conta? Ir para Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterMentored;
