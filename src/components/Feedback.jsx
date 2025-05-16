import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import FeedbackMentorTable from "./FeedbackMentorTable";

function Feedback() {

  const { mentorado } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const dadosMentorado = mentorado?.[0]; // Pega o primeiro item do array
  const {
    name,
    mail,
    role,
    areas_of_activity,
    created_date,
    last_update,
    current_company,
    occupation,
    rating,
    certificates,
    id
  } = dadosMentorado || {};

  const buscarFeedbacks = async (mentoredId) => {
    try {
      const response = await axios.get(`http://44.212.29.224:8000/feedback/${5}`);
      console.log("Feedbacks recebidos:", response.data);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
    }
  };

  const atualizarMentoriaAvaliada = (mentoringId, rating) => {
    setFeedbacks((prev) =>
      prev.map((m) =>
        m.id === mentoringId ? { ...m, mentoring_rating: rating } : m
      )
    );
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://44.212.29.224:8000/feedback/${5}`)
        .then((res) => setFeedbacks(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-dark text-white"
      style={{ height: "100vh" }}
    >
      <h1 className="mb-4" data-aos="fade-down">Olá {name}</h1>
      <p className="mb-4 text-center" data-aos="fade-up">
      
      </p>

      <FeedbackMentorTable  
        feedbacks={feedbacks}
        loading={loading}
        onFeedbackEnviado={atualizarMentoriaAvaliada}
      />

      <Link
        to="/"
        className="btn btn-outline-light btn-lg px-5 py-3"
        data-aos="zoom-in"
      >
        Voltar para a tela inicial
      </Link>
    </div>
  );
}

export default Feedback;
