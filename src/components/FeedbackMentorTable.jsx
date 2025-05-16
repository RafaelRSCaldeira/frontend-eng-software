import React, { useState } from "react";
import axios from "axios"; // certifica que tá importado no topo

const FeedbackMentorTable = ({ feedbacks = [], loading = false, onFeedbackEnviado }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mentoriaSelecionada, setMentoriaSelecionada] = useState(null);
  const [nota, setNota] = useState("");
  const [comentario, setComentario] = useState("");

  const abrirModal = (mentoria) => {
    setMentoriaSelecionada(mentoria);
    setNota("");
    setComentario("");
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setMentoriaSelecionada(null);
  };

    const enviarFeedback = async () => {
      try {
        const payload = {
          mentoring_id: mentoriaSelecionada.id,
          rating: parseInt(nota),
        };

        const response = await axios.post("http://44.212.29.224:8000/feedback-response", payload);

        console.log("Feedback enviado com sucesso:", response.data);
        alert("Obrigado pela sua avaliação!");
        
        if (onFeedbackEnviado) {
          onFeedbackEnviado(mentoriaSelecionada.id, parseInt(nota));
        }

        fecharModal();
      } catch (error) {
        console.error("Erro ao enviar feedback:", error);
        alert("Erro ao enviar feedback. Tente novamente.");
      }
    };

  return (
    <div className="container mt-5">
      {!loading && feedbacks.length > 0 && (<h3 className="text-center text-white mb-4">Mentorias realizadas:</h3>)}

      {/* Aguarde... */}
      {loading ? (
        <p className="text-center text-white py-5">Aguarde, carregando mentorias...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-white py-5">Nenhuma mentoria encontrada.</p>
      ) : (
        <div
          className="table-responsive"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          <table className="table table-bordered table-striped table-dark text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Mentoria</th>
                <th>Mentor</th>
                <th>Data</th>
                <th>Avaliação</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.mentoring_name}</td>
                  <td>{m.mentor_name}</td>
                  <td>{new Date(m.scheduled_date).toLocaleString("pt-BR")}</td>
                  <td>
                    {m.mentoring_rating !== null ? (
                      <span className="text-success fw-bold">
                        {m.mentoring_rating}
                      </span>
                    ) : (
                      <span className="text-warning">Não avaliado</span>
                    )}
                  </td>
                  <td>
                    {m.mentoring_rating === null && (
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={() => abrirModal(m)}
                      >
                        Realizar Feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de feedback */}
      {modalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", zIndex: 1050 }}
        >
          <div
            className="bg-white p-4 rounded shadow text-dark"
            style={{ width: "90%", maxWidth: "400px" }}
          >
            <h5 className="mb-3">
              Avaliar mentoria: {mentoriaSelecionada.mentoring_name}
            </h5>
            <div className="mb-3">
              <label className="form-label">Nota (0 a 5)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="5"
                value={nota}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0 && val <= 5) setNota(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Comentário (opcional)</label>
              <textarea
                className="form-control"
                rows="3"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={fecharModal}>
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                disabled={nota === ""}
                onClick={enviarFeedback}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackMentorTable;
