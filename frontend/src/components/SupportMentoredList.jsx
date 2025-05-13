import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SupportMentoredList = () => {
  const [mentoreds, setMentoreds] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Dados de exemplo mockados — substitua pela API real
    setMentoreds([
      {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        interests: ["Tecnologia da Informação", "Redes de Computadores"],
        created_at: "2025-03-23T12:00:00Z",
        updated_at: "2025-03-23T12:30:00Z",
        rating: 3.0
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
            onClick={() => navigator("/home-support")}
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
                <th>Nome</th>
                <th>Email</th>
                <th>Interesses</th>
                <th>Avaliação</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mentoreds.map((mentored) => (
                <tr key={mentored.id}>
                  <td>{mentored.id}</td>
                  <td>{mentored.name}</td>
                  <td>{mentored.email}</td>
                  <td>{mentored.interests?.join(', ') || '-'}</td>
                  <td>{mentored.rating?.toFixed(1) || '-'}</td>
                  <td>{formatDate(mentored.created_at)}</td>
                  <td>{formatDate(mentored.updated_at)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-info btn-sm">Editar</button>
                      <button className="btn btn-outline-danger btn-sm">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {mentoreds.length === 0 && (
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

export default SupportMentoredList;
