import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SupportMentorList = () => {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  function getMentors() {
    fetch('https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/role/Mentor')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json(); // converte a resposta para JSON
      })
      .then(data => {
        console.log('Dados recebidos:', data);
        setLoading(false);
        setMentors(data);
      })
      .catch(error => {
        console.error('Erro ao chamar API:', error);
      });
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (!response.ok) {
        return;
      }
      console.log("Usuário deletado com sucesso!");
      getMentors(); // ← Atualiza a lista após deletar

    } catch (error) {
      setErrorMsg("Erro de conexão, tente novamente.");
      console.error(error);
    }
  }

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    getMentors();
  }, []);

  const handleEdit = (id) => {
    navigate(`/users/edit-mentor/${id}`)
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
            onClick={() => navigate("/users-support")}
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
          onClick={() => navigate("/users/add-mentor")}>
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
              {mentors && mentors.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.id}</td>
                  <td>{mentor.name}</td>
                  <td>{mentor.email}</td>
                  <td>{mentor.areasOfActivity}</td>
                  <td>{mentor.currentCompany}</td>
                  <td>{mentor.certificates}</td>
                  <td>{mentor.occupation}</td>
                  <td>{mentor.rating}</td>
                  <td>{formatDate(mentor.createdAt)}</td>
                  <td>{formatDate(mentor.updatedAt)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-info btn-sm"
                      onClick={() => handleEdit(mentor.id)}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(mentor.id)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {mentors && mentors.length === 0 && (
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
