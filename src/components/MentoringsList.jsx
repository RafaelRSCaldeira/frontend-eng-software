import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarSupport from "./NavbarSupport";

const MentoringsList = () => {
  const [mentorings, setMentorings] = useState([]);
  const navigate = useNavigate();

  function formatDateForDisplay(input) {
    if (input === null) return "";
    // Converte de "dd-MM-yyyyTHH:mmZ" para "yyyy-MM-ddTHH:mmZ"
    const [datePart, timePart] = input.split("T");
    const [day, month, year] = datePart.split("-");
    const isoString = `${year}-${month}-${day}T${timePart}`;
    const date = new Date(isoString);
    const dayOut = String(date.getDate()).padStart(2, "0");
    const monthOut = String(date.getMonth() + 1).padStart(2, "0");
    const yearOut = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${dayOut}/${monthOut}/${yearOut} ${hours}:${minutes}`;
  }

  function formatIsoDateForDisplay(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function getMentorings() {
    fetch(
      "https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/mentorings"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        setMentorings(data);
      })
      .catch((error) => {
        console.error("Erro ao chamar API:", error);
      });
  }

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    getMentorings();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/mentorings/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) return;

      getMentorings();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  const handleEdit = (id) => {
    navigate(`/mentorings/edit-mentoring/${id}`);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("pt-BR");
  };

  return (
    <>
      <NavbarSupport />
      <div
        className="container-fluid min-vh-100 py-5 text-light"
        style={{ backgroundColor: "#121212", marginTop: "50px" }}
      >
        <div className="container">
          {/* Título e botão */}
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            data-aos="fade-down"
          >
            <h2 className="fw-bold">Gerenciar Mentorias</h2>
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/mentorings/add-mentoring")}
            >
              + Nova Mentoria
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
                  <th>ID Mentor</th>
                  <th>ID Mentorado</th>
                  <th>Concluído</th>
                  <th>Nota</th>
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
                    <td>{mentoring.name}</td>
                    <td>{mentoring.mentorID}</td>
                    <td>{mentoring.mentoredID}</td>
                    <td>{mentoring.concluded ? "Sim" : "Não"}</td>
                    <td>{mentoring.rating}</td>
                    <td>{formatDateForDisplay(mentoring.scheduledDate)}</td>
                    <td>{formatIsoDateForDisplay(mentoring.createdAt)}</td>
                    <td>{formatIsoDateForDisplay(mentoring.updatedAt)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleEdit(mentoring.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(mentoring.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {mentorings.length === 0 && (
                  <tr>
                    <td colSpan="11" className="text-center py-4 text-muted">
                      Nenhuma mentoria encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentoringsList;
