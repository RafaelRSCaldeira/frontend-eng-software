import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddMentoring = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mentorID, setMentorID] = useState("");
  const [mentoredID, setMentoredID] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [concluded, setConcluded] = useState(false);
  const [rating, setRating] = useState(3);
  const [topicID, setTopicID] = useState("0");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!mentorID) newErrors.mentorID = "ID do mentor é obrigatório.";
    if (!mentoredID) newErrors.mentoredID = "ID do mentorado é obrigatório.";
    if (!scheduledDate) newErrors.scheduledDate = "Data é obrigatória.";
    if (rating && (rating < 0 || rating > 5))
      newErrors.rating = "A nota deve estar entre 0 e 5.";
    return newErrors;
  };

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

  const formatDateToCustomFormat = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}T${hours}:${minutes}Z`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      name,
      mentorID: Number(mentorID),
      mentoredID: Number(mentoredID),
      topicID: 0,
      scheduledDate: formatDateToCustomFormat(scheduledDate),
      concluded,
      rating: Number(rating),
    };

    console.log(payload);

    try {
      const url = id
        ? `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/mentorings/${id}`
        : `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/mentorings`;

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro na API:", errorData);
        return;
      }

      navigate("/mentorings");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchSchedule = async () => {
        try {
          const res = await fetch(
            `https://backendsuporte-e5h4aqaxcnhkc8hk.brazilsouth-01.azurewebsites.net/api/v1/mentorings/${id}`
          );
          if (!res.ok) throw new Error("Erro ao buscar agendamento");
          const data = await res.json();
          setName(data.name || "");
          setMentorID(data.mentorID || "");
          setMentoredID(data.mentoredID || "");
          setScheduledDate(formatDateForDisplay(data.scheduledDate?.slice(0, 16)) || "");
          setConcluded(data.concluded || false);
          setRating(data.rating !== null ? data.rating : 3);
        } catch (err) {
          console.error(err);
        }
      };

      fetchSchedule();
    }
  }, [id]);

  return (
    <>
      <style>{`
        .page-background {
          background-color: #121212;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .custom-card {
          background-color: #1a1a2e;
          border: none;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 600px;
        }

        .form-control.custom-input {
          background-color: #2b2d42;
          border: 1px solid #444;
          color: #fff;
          border-radius: 0.5rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-control.custom-input::placeholder {
          color: #ffffff;
        }

        .form-control.custom-input:focus {
          border-color: #7f5af0;
          box-shadow: 0 0 0 0.2rem rgba(127, 90, 240, 0.25);
          background-color: #3b3f58;
        }

        .form-label {
          color: #cfd2dc;
          font-weight: 500;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #7f5af0, #00cfe8);
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 0.5rem;
        }

        .btn-gradient:hover {
          opacity: 0.9;
        }

        .invalid-feedback {
          color: #ff6b6b;
        }
      `}</style>

      <div className="page-background">
        <div className="card custom-card p-4">
          <h2 className="text-center text-light fw-bold mb-4">
            {id ? "Editar Agendamento" : "Novo Agendamento"}
          </h2>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className={`form-control custom-input ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">ID do Mentor</label>
                <input
                  type="number"
                  className={`form-control custom-input ${
                    errors.mentorID ? "is-invalid" : ""
                  }`}
                  value={mentorID}
                  onChange={(e) => setMentorID(e.target.value)}
                />
                {errors.mentorID && (
                  <div className="invalid-feedback">{errors.mentorID}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">ID do Mentorado</label>
                <input
                  type="number"
                  className={`form-control custom-input ${
                    errors.mentoredID ? "is-invalid" : ""
                  }`}
                  value={mentoredID}
                  onChange={(e) => setMentoredID(e.target.value)}
                />
                {errors.mentoredID && (
                  <div className="invalid-feedback">{errors.mentoredID}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Data e Hora</label>
                <input
                  type="datetime-local"
                  className={`form-control custom-input ${
                    errors.scheduledDate ? "is-invalid" : ""
                  }`}
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
                {errors.scheduledDate && (
                  <div className="invalid-feedback">{errors.scheduledDate}</div>
                )}
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="concludedCheck"
                  checked={concluded}
                  onChange={(e) => setConcluded(e.target.checked)}
                />
                <label
                  className="form-check-label text-light"
                  htmlFor="concludedCheck"
                >
                  Agendamento concluído?
                </label>
              </div>

              <div className="mb-3">
                <label className="form-label">Avaliação (0 a 5)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  className={`form-control custom-input ${
                    errors.rating ? "is-invalid" : ""
                  }`}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                {errors.rating && (
                  <div className="invalid-feedback">{errors.rating}</div>
                )}
              </div>

              <button type="submit" className="btn btn-gradient w-100 mt-3">
                {id ? "Atualizar" : "Agendar"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary mt-2 ms-2"
                onClick={() => navigate("/mentorings")}
              >
                ← Voltar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMentoring;
