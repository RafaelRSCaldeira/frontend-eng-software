import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddMentor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    areasOfActivity: "",
    currentCompany: "",
    certificates: "",
    occupation: "",
    role: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório.";
    if (!formData.password.trim()) newErrors.password = "Senha é obrigatória.";
    if (!formData.areasOfActivity.trim())
      newErrors.areasOfActivity = "Áreas de atuação são obrigatórias.";
    if (!formData.currentCompany.trim())
      newErrors.currentCompany = "Empresa atual é obrigatória.";
    if (!formData.certificates.trim())
      newErrors.certificates = "Certificados são obrigatórios.";
    if (!formData.occupation.trim())
      newErrors.occupation = "Ocupação é obrigatória.";
    if (id && !formData.role.trim()) newErrors.role = "Papel é obrigatório.";
    if (!formData.rating && formData.rating !== 0)
      newErrors.rating = "Rating é obrigatório.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const requestData = {
      ...formData,
      role: id ? formData.role : "Mentor",
    };

    if (id) {
      requestData.password = null;
    }

    const url = id
      ? `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/${id}`
      : `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users`;

    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then(() => navigate("/users/mentor"))
      .catch((error) => console.error("Erro ao enviar dados:", error));
  };

  useEffect(() => {
    if (id) {
      fetch(
        `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/${id}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar dados");
          return res.json();
        })
        .then((data) => {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            password: data.password || "",
            areasOfActivity: data.areasOfActivity || "",
            currentCompany: data.currentCompany || "",
            certificates: data.certificates || "",
            occupation: data.occupation || "",
            role: data.role || "",
            rating: data.rating || "",
          });
        })
        .catch((err) => console.error("Erro:", err));
    }
  }, [id]);

  return (
    <>
      <style>{`
      body {
        background-color: #121212 !important;
      }

      .page-background {
        background-color: #121212;
        min-height: 100vh;
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

      <section
        className="d-flex align-items-center justify-content-center vh-100 section"
        data-aos="fade-up"
      >
        <div className="container page-background">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card custom-card p-4 shadow">
                <h2 className="text-center text-light fw-bold mb-4">
                  {id ? "Atualizar Mentor" : "Cadastrar Novo Mentor"}
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Campo Nome */}
                  <div className="mb-3">
                    <label className="form-label text-light">Nome</label>
                    <input
                      type="text"
                      className={`form-control custom-input ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Digite o nome do mentor"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* Campo Email */}
                  <div className="mb-3">
                    <label className="form-label text-light">Email</label>
                    <input
                      type="email"
                      className={`form-control custom-input ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Digite o e-mail do mentor"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Campo Senha (apenas se id === null) */}
                  {!id && (
                    <div className="mb-3">
                      <label className="form-label text-light">Senha</label>
                      <input
                        type="password"
                        className={`form-control custom-input ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Digite a senha"
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Restante dos campos */}
                  <div className="mb-3">
                    <label className="form-label text-light">
                      Empresa Atual
                    </label>
                    <input
                      type="text"
                      className={`form-control custom-input ${
                        errors.currentCompany ? "is-invalid" : ""
                      }`}
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      placeholder="Ex: Microsoft"
                    />
                    {errors.currentCompany && (
                      <div className="invalid-feedback">
                        {errors.currentCompany}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light">
                      Certificados
                    </label>
                    <input
                      type="text"
                      className={`form-control custom-input ${
                        errors.certificates ? "is-invalid" : ""
                      }`}
                      name="certificates"
                      value={formData.certificates}
                      onChange={handleChange}
                      placeholder="Ex: CCIE, HCIE"
                    />
                    {errors.certificates && (
                      <div className="invalid-feedback">
                        {errors.certificates}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light">Ocupação</label>
                    <input
                      type="text"
                      className={`form-control custom-input ${
                        errors.occupation ? "is-invalid" : ""
                      }`}
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Ex: Líder de Equipe"
                    />
                    {errors.occupation && (
                      <div className="invalid-feedback">
                        {errors.occupation}
                      </div>
                    )}
                  </div>

                  {/* Áreas de Atuação */}
                  <div className="mb-3">
                    <label className="form-label text-light">
                      Áreas de Atuação
                    </label>
                    <select
                      className={`form-select custom-select ${
                        errors.areasOfActivity ? "is-invalid" : ""
                      }`}
                      name="areasOfActivity"
                      value={formData.areasOfActivity}
                      onChange={handleChange}
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
                    {errors.areasOfActivity && (
                      <div className="invalid-feedback">
                        {errors.areasOfActivity}
                      </div>
                    )}
                  </div>

                  {/* Campo Rating */}
                  <div className="mb-3">
                    <label className="form-label text-light">Rating</label>
                    <input
                      type="number"
                      className={`form-control custom-input ${
                        errors.rating ? "is-invalid" : ""
                      }`}
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="Nota de 0 a 5"
                      min="0"
                      max="5"
                      step="1"
                    />
                    {errors.rating && (
                      <div className="invalid-feedback">{errors.rating}</div>
                    )}
                  </div>
                  {/* Papel (somente se estiver editando) */}
                  {id && (
                    <div className="mb-3">
                      <label className="form-label text-light">Papel</label>
                      <select
                        className="form-select custom-select"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="">Selecione um papel</option>
                        <option value="Mentor">Mentor</option>
                        <option value="Mentorado">Mentorado</option>
                        <option value="Suporte">Suporte</option>
                      </select>
                      {errors.role && (
                        <div className="invalid-feedback d-block">
                          {errors.role}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Botões */}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-gradient mt-3">
                      {id ? "Atualizar" : "Cadastrar"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary mt-2"
                      onClick={() => navigate("/users/mentor")}
                    >
                      ← Voltar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddMentor;
