import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CompletedMentorings = () => {
  const navigate = useNavigate();
  const [completedMentorings, setCompletedMentorings] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedMentoring, setSelectedMentoring] = useState(null);
  const [feedback, setFeedback] = useState({
    rating: 5,
    comment: '',
    learningOutcomes: '',
    suggestionsForImprovement: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Dados mockados - substituir por chamada à API real
    setCompletedMentorings([
      {
        id: 1,
        mentorName: 'João Silva',
        mentoredName: 'Maria Santos',
        topic: 'Desenvolvimento Frontend',
        date: '2024-03-20',
        duration: '1h',
        status: 'Concluída',
        hasFeedback: false
      },
      {
        id: 2,
        mentorName: 'Ana Oliveira',
        mentoredName: 'Pedro Costa',
        topic: 'DevOps',
        date: '2024-03-18',
        duration: '1.5h',
        status: 'Concluída',
        hasFeedback: true,
        feedback: {
          rating: 5,
          comment: 'Excelente mentoria!',
          learningOutcomes: 'Aprendi muito sobre CI/CD',
          suggestionsForImprovement: 'Nenhuma sugestão, foi perfeito'
        }
      }
    ]);
  }, []);

  const handleFeedbackSubmit = () => {
    // Aqui você implementaria a lógica para salvar o feedback
    console.log('Feedback submetido:', { mentoringId: selectedMentoring.id, ...feedback });
    
    // Atualiza a lista de mentorias com o novo feedback
    setCompletedMentorings(prevMentorings =>
      prevMentorings.map(mentoring =>
        mentoring.id === selectedMentoring.id
          ? { ...mentoring, hasFeedback: true, feedback }
          : mentoring
      )
    );
    
    setShowFeedbackModal(false);
    setSelectedMentoring(null);
    setFeedback({
      rating: 5,
      comment: '',
      learningOutcomes: '',
      suggestionsForImprovement: ''
    });
  };

  const openFeedbackModal = (mentoring) => {
    setSelectedMentoring(mentoring);
    if (mentoring.feedback) {
      setFeedback(mentoring.feedback);
    }
    setShowFeedbackModal(true);
  };

  return (
    <Container fluid className="min-vh-100 py-5 bg-dark text-light">
      <Container>
        <div className="mb-4" data-aos="fade-down">
          <Button
            variant="outline-light"
            onClick={() => navigate(-1)}
            className="mb-3"
          >
            ← Voltar
          </Button>
          <h2 className="fw-bold">Mentorias Concluídas</h2>
        </div>

        <Card className="bg-secondary border-0 shadow" data-aos="fade-up">
          <Card.Body>
            <Table responsive hover variant="dark" className="mb-0">
              <thead>
                <tr>
                  <th>Mentor</th>
                  <th>Mentorado</th>
                  <th>Tópico</th>
                  <th>Data</th>
                  <th>Duração</th>
                  <th>Status</th>
                  <th>Feedback</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {completedMentorings.map((mentoring) => (
                  <tr key={mentoring.id}>
                    <td>{mentoring.mentorName}</td>
                    <td>{mentoring.mentoredName}</td>
                    <td>{mentoring.topic}</td>
                    <td>{new Date(mentoring.date).toLocaleDateString('pt-BR')}</td>
                    <td>{mentoring.duration}</td>
                    <td>{mentoring.status}</td>
                    <td>
                      {mentoring.hasFeedback ? (
                        <span className="text-success">✓ Enviado</span>
                      ) : (
                        <span className="text-warning">Pendente</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant={mentoring.hasFeedback ? "info" : "primary"}
                        size="sm"
                        onClick={() => openFeedbackModal(mentoring)}
                      >
                        {mentoring.hasFeedback ? "Ver Feedback" : "Dar Feedback"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal
          show={showFeedbackModal}
          onHide={() => setShowFeedbackModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="bg-dark text-light">
            <Modal.Title>
              {selectedMentoring?.hasFeedback
                ? "Visualizar Feedback"
                : "Adicionar Feedback"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-light">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Avaliação</Form.Label>
                <Form.Select
                  value={feedback.rating}
                  onChange={(e) =>
                    setFeedback({ ...feedback, rating: Number(e.target.value) })
                  }
                  disabled={selectedMentoring?.hasFeedback}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Estrela' : 'Estrelas'}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Comentário Geral</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={feedback.comment}
                  onChange={(e) =>
                    setFeedback({ ...feedback, comment: e.target.value })
                  }
                  disabled={selectedMentoring?.hasFeedback}
                  placeholder="Compartilhe sua experiência geral com a mentoria..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Principais Aprendizados</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={feedback.learningOutcomes}
                  onChange={(e) =>
                    setFeedback({ ...feedback, learningOutcomes: e.target.value })
                  }
                  disabled={selectedMentoring?.hasFeedback}
                  placeholder="Quais foram os principais conhecimentos adquiridos?"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sugestões de Melhoria</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={feedback.suggestionsForImprovement}
                  onChange={(e) =>
                    setFeedback({
                      ...feedback,
                      suggestionsForImprovement: e.target.value,
                    })
                  }
                  disabled={selectedMentoring?.hasFeedback}
                  placeholder="Tem alguma sugestão para melhorar as próximas mentorias?"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-dark text-light">
            <Button
              variant="secondary"
              onClick={() => setShowFeedbackModal(false)}
            >
              Fechar
            </Button>
            {!selectedMentoring?.hasFeedback && (
              <Button variant="primary" onClick={handleFeedbackSubmit}>
                Enviar Feedback
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
};

export default CompletedMentorings; 