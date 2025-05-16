import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

function LoginPage() {
  const location = useLocation();
  const role = location.state?.user || "none";

  const { login } = useAuth();

  function handleLogin(data) {
    login(data);
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    pwd: "",
    role: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      role: role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.mail,
            password: formData.pwd,
            role: formData.role,
          }),
        }
      );

      if (!response.ok) {
        setErrorMsg("Email ou senha inválidos");
        return;
      }

      login({ email: formData.mail, role: formData.role });

      if (formData.role === "Mentor") {
        navigate(`/users-mentor`);
      } else if (formData.role === "Mentorado") {
        navigate(`/users-mentored`);
      } else if (formData.role === "Suporte") {
        navigate(`/users-support`);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      setErrorMsg("Erro de conexão, tente novamente.");
      console.error(error);
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
      `}</style>

      <div className="page-background">
        <div className="card shadow-lg custom-card p-4" data-aos="zoom-in">
          <h2
            className="text-center mb-4 fw-bold text-light"
            data-aos="fade-down"
          >
            Login de {role}
          </h2>
          {errorMsg && (
            <div
              className="alert alert-danger text-center"
              role="alert"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3" data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="mail" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control custom-input"
                id="mail"
                name="mail"
                placeholder="Ex: joao@email.com"
                value={formData.mail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3" data-aos="fade-up" data-aos-delay="300">
              <label htmlFor="pwd" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="form-control custom-input"
                id="pwd"
                name="pwd"
                placeholder="Crie uma senha segura"
                value={formData.pwd}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className="d-flex justify-content-between mb-3"
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/login")}
              >
                ← Voltar
              </button>
              <button type="submit" className="btn btn-gradient px-4">
                <i className="bi bi-person-plus-fill me-2"></i>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
