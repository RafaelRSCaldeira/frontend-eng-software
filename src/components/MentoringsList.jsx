import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MentoringsList = () => {
  const [mentorings, setMentorings] = useState([]);
  const navigator = useNavigate();
  const location = window.location;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Dados de exemplo mockados — substitua pela API real
    setMentorings([
  {
    "id": 1,
    "id_mentor": 1,
    "id_mentored": 1,
    "id_topic": 1,
    "status": "scheduled",
    "date": "2025-03-23T12:00:00Z",
    "created_at": "2025-03-23T12:00:00Z",
    "updated_at": "2025-03-23T12:30:00Z"
  },
  {
    "id": 2,
    "id_mentor": 2,
    "id_mentored": 3,
    "id_topic": 4,
    "status": "completed",
    "date": "2025-03-24T10:00:00Z",
    "created_at": "2025-03-23T13:00:00Z",
    "updated_at": "2025-03-24T11:30:00Z"
  },
  {
    "id": 3,
    "id_mentor": 1,
    "id_mentored": 2,
    "id_topic": 2,
    "status": "cancelled",
    "date": "2025-03-25T15:30:00Z",
    "created_at": "2025-03-24T09:00:00Z",
    "updated_at": "2025-03-25T08:00:00Z"
  },
  {
    "id": 4,
    "id_mentor": 3,
    "id_mentored": 4,
    "id_topic": 3,
    "status": "scheduled",
    "date": "2025-03-26T14:00:00Z",
    "created_at": "2025-03-25T10:00:00Z",
    "updated_at": "2025-03-25T10:15:00Z"
  },
  {
    "id": 5,
    "id_mentor": 2,
    "id_mentored": 5,
    "id_topic": 5,
    "status": "completed",
    "date": "2025-03-27T09:00:00Z",
    "created_at": "2025-03-26T08:00:00Z",
    "updated_at": "2025-03-27T10:00:00Z"
  }
]);
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div
      className="container-fluid min-vh-100 py-5 text-light"
      style={{ backgroundColor: '#121212' }}
    >
      <div className="container">
        <div className="mb-3" data-aos="fade-down" data-aos-delay="100">
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            onClick={() => navigator("/users-support")}
          >
            <i className="bi bi-arrow-left"></i> Voltar
          </button>
        </div>
        {/* Título e botão */}
        <div
          className="d-flex justify-content-between align-items-center mb-4"
          data-aos="fade-down"
        >
          <h2 className="fw-bold">Gerenciar Mentorado</h2>
          <button className="btn btn-outline-light"
          onClick={() => navigator("/users/add-mentored")}>
            + Novo Suporte
          </button>
        </div>

        {/* Tabela */}
        <div className="table-responsive" data-aos="fade-up" data-aos-delay="200">
          <table
            className="table table-hover table-bordered align-middle text-light"
            style={{
              backgroundColor: '#1e1e1e',
              borderRadius: '1rem',
              overflow: 'hidden',
              borderCollapse: 'separate',
              borderSpacing: '0',
            }}
          >
            <thead className="table-light text-dark">
              <tr>
                <th>ID</th>
                <th>ID Mentor</th>
                <th>ID Mentored</th>
                <th>Status</th>
                <th>Data</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mentorings.map((mentoring) => (
                <tr key={mentoring.id}>
                  <td>{mentoring.id}</td>
                  <td>{mentoring.id_mentor}</td>
                  <td>{mentoring.id_mentored}</td>
                  <td>{mentoring.status}</td>
                  <td>{mentoring.date}</td>
                  <td>{mentoring.created_at}</td>
                  <td>{mentoring.updated_at}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-info btn-sm">Editar</button>
                      <button className="btn btn-outline-danger btn-sm">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {mentorings.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Nenhum suporte encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentoringsList;
