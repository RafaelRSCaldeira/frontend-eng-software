import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SupportMentoredList = () => {
  const [loading, setLoading] = useState(true);
  const [mentoreds, setMentoreds] = useState([]);
  const navigate = useNavigate();

  const getMentoreds = () => {
    fetch('https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/role/Mentorado')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setMentoreds(data);
      })
      .catch(error => {
        console.error('Erro ao chamar API:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    getMentoreds();
  }, []);

  const handleEdit = (id) => {
    navigate(`/users/edit-mentored/${id}`);
  };

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
        console.error("Erro ao deletar usuário");
        return;
      }

      getMentoreds(); // Atualiza lista após exclusão
    } catch (error) {
      console.error("Erro de conexão ao deletar:", error);
    }
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
          <h2 className="fw-bold">Gerenciar Mentorado</h2>
          <button className="btn btn-outline-light"
            onClick={() => navigate("/users/add-mentored")}>
            + Novo Mentorado
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
                <th>Interesse</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Carregando...
                  </td>
                </tr>
              ) : mentoreds.length > 0 ? (
                mentoreds.map((mentored) => (
                  <tr key={mentored.id}>
                    <td>{mentored.id}</td>
                    <td>{mentored.name || '-'}</td>
                    <td>{mentored.email || '-'}</td>
                    <td>{mentored.areasOfActivity || '-'}</td>
                    <td>{formatDate(mentored.createdAt)}</td>
                    <td>{formatDate(mentored.updatedAt)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-info btn-sm" onClick={() => handleEdit(mentored.id)}>
                          Editar
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(mentored.id)}>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Nenhum mentorado encontrado.
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
