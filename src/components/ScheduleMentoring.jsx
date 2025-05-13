import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function ScheduleMentoring() {
  const location = useLocation();
  const navigate = useNavigate();
  const mentor = location.state?.mentor;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (!mentor) {
    // Redireciona caso o usuário acesse essa rota sem selecionar um mentor
    navigate("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mentoria agendada com sucesso!");
    navigate("/"); // Pode ser uma página de confirmação no futuro
  };

  return (
    <div className="container min-vw-100 min-vh-100 d-flex align-items-center justify-content-center bg-dark text-light py-5">
      <div className="card bg-secondary text-light rounded-4 shadow-lg p-5 w-100" style={{ maxWidth: "600px" }} data-aos="zoom-in">
        <h2 className="mb-4">Agendar Mentoria com {mentor.name}</h2>
        <p><strong>Especialidade:</strong> {mentor.expertise}</p>
        <p><strong>Empresa:</strong> {mentor.company}</p>
        <p>{mentor.bio}</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Data</label>
            <input type="date" className="form-control" id="date" required />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Horário</label>
            <input type="time" className="form-control" id="time" required />
          </div>
          <button type="submit" className="btn btn-light w-100">Agendar</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleMentoring;
