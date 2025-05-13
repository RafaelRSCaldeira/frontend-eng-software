import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MentorHistory() {
    const [realizadas, setRealizadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const mentorId = 1; // Simulação do ID do mentor

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        async function carregarRealizadas() {
            setLoading(true);
            setErro(null);
            try {
                // Simulação da chamada à API para obter mentorias realizadas
                const exemploRealizadas = [
                    { id: 201, aluno: 'Carlos Pereira', data: '2025-05-10', topico: 'Introdução ao React', status: 'realizada' },
                    { id: 202, aluno: 'Fernanda Lima', data: '2025-05-03', topico: 'Fundamentos de JavaScript', status: 'realizada' },
                    { id: 203, aluno: 'Ricardo Oliveira', data: '2025-04-26', topico: 'HTML e CSS Essencial', status: 'realizada' },
                    // Adicionando uma mentoria aprovada para testar o botão "Marcar como Realizada"
                    { id: 204, aluno: 'Juliana Santos', data: '2025-05-20', topico: 'React Router', status: 'aprovada' },
                ];
                setRealizadas(exemploRealizadas);
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
                setErro('Erro ao carregar o histórico de mentorias realizadas.');
            } finally {
                setLoading(false);
            }
        }

        carregarRealizadas();
    }, [mentorId]);

    const handleMarcarRealizada = async (id) => {
        // Simulação da chamada à API para marcar a mentoria como realizada
        console.log(`Mentoria ${id} marcada como realizada!`);
        // Atualizar o estado local após a confirmação bem-sucedida
        setRealizadas(realizadas.map(mentoria =>
            mentoria.id === id ? { ...mentoria, status: 'realizada' } : mentoria
        ));
    };

    if (loading) {
        return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">Carregando histórico...</div>;
    }

    if (erro) {
        return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light"><p className="text-danger">Erro: {erro}</p></div>;
    }

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light position-relative">
            <Link
                to="/mentor-home"
                className="position-absolute top-0 start-0 m-4 btn btn-outline-light d-flex align-items-center gap-2"
                style={{ zIndex: 10 }}
                data-aos="fade-down"
            >
                <i className="bi bi-arrow-left"></i> Voltar
            </Link>
            <Card className="shadow-lg border-0 rounded-4 bg-dark text-light p-5" data-aos="zoom-in" style={{ maxWidth: '800px', width: '100%' }}>
                <Card.Body>
                    <h2 className="card-title mb-4 fw-bold" data-aos="fade-up">Histórico de Mentorias Realizadas</h2>
                    {realizadas.length > 0 ? (
                        <ListGroup className="mt-4" data-aos="fade-up" data-aos-delay="100">
                            {realizadas.map(mentoria => (
                                <ListGroup.Item
                                    key={mentoria.id}
                                    className="bg-secondary text-light border-light mb-2 rounded-3 d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h6 className="mb-1"><strong>Aluno:</strong> {mentoria.aluno}</h6>
                                        <p className="mb-0"><strong>Tópico:</strong> {mentoria.topico}</p>
                                        <p className="mb-0"><strong>Data:</strong> {mentoria.data}</p>
                                        <Badge pill bg="info">{mentoria.status.toUpperCase()}</Badge>
                                    </div>
                                    {mentoria.status === 'aprovada' && (
                                        <Button variant="outline-success" size="sm" onClick={() => handleMarcarRealizada(mentoria.id)}>
                                            <FontAwesomeIcon icon={faCheckDouble} /> Marcar como Realizada
                                        </Button>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="mt-3" data-aos="fade-up" data-aos-delay="100">Nenhuma mentoria realizada até o momento.</p>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default MentorHistory;