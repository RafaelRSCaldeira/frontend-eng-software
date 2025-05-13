import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const SupportSupportList = () => {
  const [users, setUsers] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  function addSupport() {
    console.log("sadl");
    navigator("/users/add-support");
  }

  return (
    <div
      className="container-fluid min-vh-100 py-5 text-light"
      style={{ backgroundColor: "#121212" }}
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
                  <td>{user.role}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-info btn-sm">
                        Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
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
