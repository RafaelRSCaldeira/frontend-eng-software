import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SupportMentorList = () => {
  const [mentors, setMentors] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Exemplo de dados mockados (remova isso e substitua por chamada à API real)
    setMentors([
      {
        id: 1,
        name: 'João Silva',
        email: 'joao@email.com',
        areas_of_activity: ['Cybersegurança', 'Redes de Computadores'],
        current_company: 'Microsoft',
        certificates: ['CCIE', 'HCIE'],
        occupation: 'Líder de Equipe',
        created_at: '2025-03-23T12:00:00Z',
        updated_at: '2025-03-23T12:30:00Z',
        rating: 3.0,
      },
    ]);
  }, []);

  const handleEdit = (id) => {
    navigator(`/users/edit-mentor/${id}`)
  }
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
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
          <h2 className="fw-bold">Gerenciar Mentor</h2>
          <button className="btn btn-outline-light"
          onClick={() => navigator("/users/add-mentor")}>
            + Novo Mentor
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
                <th>Nome</th>
                <th>Email</th>
                <th>Áreas de Atuação</th>
                <th>Empresa Atual</th>
                <th>Certificados</th>
                <th>Ocupação</th>
                <th>Avaliação</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.id}</td>
                  <td>{mentor.name}</td>
                  <td>{mentor.email}</td>
                  <td>{mentor.areas_of_activity.join(', ')}</td>
                  <td>{mentor.current_company}</td>
                  <td>{mentor.certificates.join(', ')}</td>
                  <td>{mentor.occupation}</td>
                  <td>{mentor.rating.toFixed(1)}</td>
                  <td>{formatDate(mentor.created_at)}</td>
                  <td>{formatDate(mentor.updated_at)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-info btn-sm"
                      onClick={() => handleEdit(mentor.id)}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {mentors.length === 0 && (
                <tr>
                  <td colSpan="11" className="text-center py-4">
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

export default SupportMentorList;
