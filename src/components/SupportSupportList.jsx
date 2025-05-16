import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const SupportSupportList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
    function getSupports() {
      fetch('https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/users/role/Suporte')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
          }
          return response.json(); // converte a resposta para JSON
        })
        .then(data => {
          console.log('Dados recebidos:', data);
          setUsers(data);
        })
        .catch(error => {
          console.error('Erro ao chamar API:', error);
        });
    }

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    getSupports();
  }, []);

  function addSupport() {
    console.log("sadl");
    navigate("/users/add-support");
  }

  function handleEdit(id) {
    navigate(`/users/edit-support/${id}`);
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
        console.error("Erro ao deletar usuário");
        return;
      }

      getSupports(); // Atualiza lista após exclusão
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
      style={{ backgroundColor: "#121212" }}
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
          <h2 className="fw-bold">Gerenciar Suporte</h2>
          <button className="btn btn-outline-light" onClick={addSupport}>
            + Novo Suporte
          </button>
        </div>

        {/* Tabela */}
        <div
          className="table-responsive"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <table
            className="table table-hover table-bordered align-middle text-light"
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "1rem",
              overflow: "hidden",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            <thead className="table-light text-dark">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-info btn-sm"
                      onClick={() => handleEdit(user.id)}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(user.id)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
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

export default SupportSupportList;
