import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function RegisterMentored() {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    pwd: "",
    occupation: "",
    currentCompany: "",
    areasOfInterest: "",
    certificates: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigator("/home");
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
            Cadastro de Mentor
          </h2>
          <button
            type="button"
            className="btn btn-outline-light mb-4"
            onClick={() => navigator("/register")}
            data-aos="fade-left"
          >
            ← Voltar
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-3" data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="name" className="form-label">
                Nome Completo
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="name"
                name="name"
                placeholder="Ex: João da Silva"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
              <label htmlFor="occupation" className="form-label">
                Ocupação
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="occupation"
                name="occupation"
                placeholder="Ex: Desenvolvedor, Designer, Engenheiro..."
                value={formData.occupation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3" data-aos="fade-up" data-aos-delay="500">
              <label htmlFor="currentCompany" className="form-label">
                Empresa Atual
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="currentCompany"
                name="currentCompany"
                placeholder="Ex: Google, Freelancer, Sem vínculo"
                value={formData.currentCompany}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4" data-aos="fade-up" data-aos-delay="600">
              <label htmlFor="areasOfInterest" className="form-label">
                Áreas de Atividade
              </label>
              <textarea
                className="form-control custom-input"
                id="areasOfInterest"
                name="areasOfInterest"
                rows="3"
                placeholder="Ex: IA, UX Design, Cibersegurança..."
                value={formData.areasOfInterest}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-4" data-aos="fade-up" data-aos-delay="600">
              <label htmlFor="certificates" className="form-label">
                Certificados
              </label>
              <textarea
                className="form-control custom-input"
                id="certificates"
                name="certificates"
                rows="3"
                placeholder="Ex: CCNA, CCNP, HCIA"
                value={formData.certificates}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-gradient w-100 py-2"
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              Cadastrar Mentor
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterMentored;
