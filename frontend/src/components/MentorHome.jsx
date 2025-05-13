import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Button, Modal, Badge, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCheck, faTimes, faUser, faListAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MentorHome() {
    const [mentorias, setMentorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const mentorId = 1; // Simulação do ID do mentor
    const [showModal, setShowModal] = useState(false);
    const [selectedMentoria, setSelectedMentoria] = useState(null);
    const [mentoriasPendentes, setMentoriasPendentes] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        aprovadas: 0,
        pendentes: 0,
        recusadas: 0,
        realizadas: 0,
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        async function carregarMentorias() {
            setLoading(true);
            setErro(null);
            try {
                // Simulação de dados de mentorias com diferentes status
                const exemploMentorias = [
                    { id: 1, titulo: 'Mentoria de React Avançado', descricao: '...', data: '2025-05-15', status: 'aprovada' },
                    { id: 2, titulo: 'Otimização de Performance em Front-end', descricao: '...', data: '2025-05-22', status: 'pendente' },
                    { id: 3, titulo: 'Testes Unitários em React', descricao: '...', data: '2025-06-01', status: 'realizada' },
                    { id: 4, titulo: 'GraphQL no Front-end', descricao: '...', data: '2025-06-08', status: 'pendente' },
                    { id: 5, titulo: 'Estratégias de Deploy Contínuo', descricao: '...', data: '2025-06-15', status: 'recusada' },
                    { id: 6, titulo: 'Melhores Práticas de SEO para React', descricao: '...', data: '2025-06-22', status: 'aprovada' },
                    { id: 7, titulo: 'Introdução ao Node.js', descricao: '...', data: '2025-06-29', status: 'pendente' },
                ];

                const mentoriasFormatadas = exemploMentorias.map(mentoria => ({
                    ...mentoria,
                    data: new Date(mentoria.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
                }));

                // Ordenar as mentorias: 'aprovada' primeiro, depois as outras
                const mentoriasOrdenadas = [...mentoriasFormatadas].sort((a, b) => {
                    if (a.status === 'aprovada' && b.status !== 'aprovada') {
                        return -1;
                    }
                    if (a.status !== 'aprovada' && b.status === 'aprovada') {
                        return 1;
                    }
                    return 0; // Mantém a ordem original para os outros status
                });

                setMentorias(mentoriasOrdenadas);

                // Filtrar mentorias pendentes e contar status
                const pendentes = mentoriasFormatadas.filter(m => m.status === 'pendente');
                setMentoriasPendentes(pendentes);

                setStatusCounts({
                    pendentes: pendentes.length,
                    aprovadas: mentoriasFormatadas.filter(m => m.status === 'aprovada').length,
                    recusadas: mentoriasFormatadas.filter(m => m.status === 'recusada').length,
                    realizadas: mentoriasFormatadas.filter(m => m.status === 'realizada').length,
                });

            } catch (error) {
                console.error('Erro ao carregar mentorias:', error);
                setErro('Erro ao carregar a lista de mentorias.');
            } finally {
                setLoading(false);
            }
        }

        if (mentorId) {
            carregarMentorias();
        } else {
            setErro('ID do mentor não encontrado.');
            setLoading(false);
        }
    }, [mentorId]);

    const handleVerDetalhes = (mentoria) => {
        setSelectedMentoria(mentoria);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMentoria(null);
    };

    const handleAprovarMentoria = (id) => {
        console.log(`Mentoria ${id} aprovada! (Simulação)`);
        setMentoriasPendentes(mentoriasPendentes.filter(m => m.id !== id));
        setStatusCounts(prevCounts => ({
            ...prevCounts,
            pendentes: prevCounts.pendentes - 1,
            aprovadas: prevCounts.aprovadas + 1,
        }));
        setMentorias(prevMentorias =>
            prevMentorias.map(m =>
                m.id === id ? { ...m, status: 'aprovada' } : m
            )
        );
    };

    const handleRecusarMentoria = (id) => {
        console.log(`Mentoria ${id} recusada! (Simulação)`);
        setMentoriasPendentes(mentoriasPendentes.filter(m => m.id !== id));
        setStatusCounts(prevCounts => ({
            ...prevCounts,
            pendentes: prevCounts.pendentes - 1,
            recusadas: prevCounts.recusadas + 1,
        }));
        setMentorias(prevMentorias =>
            prevMentorias.map(m =>
                m.id === id ? { ...m, status: 'recusada' } : m
            )
        );
    };

    if (loading) {
        return (
            <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">
                Carregando suas mentorias...
            </div>
        );
    }

    if (erro) {
        return (
            <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">
                <p className="text-danger">Erro: {erro}</p>
            </div>
        );
    }

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light position-relative">
            {/* Botão de Voltar */}
            <Link
                to="/"
                className="position-absolute top-0 start-0 m-4 btn btn-outline-light d-flex align-items-center gap-2"
                style={{ zIndex: 10 }}
                data-aos="fade-down"
            >
                <i className="bi bi-arrow-left"></i> Voltar
            </Link>

            <div className="row justify-content-center w-100">
                <div className="col-lg-7 col-md-8 col-sm-10">
                    <div
                        className="card shadow-lg border-0 rounded-4 bg-dark text-light"
                        data-aos="zoom-in"
                    >
                        <div className="card-body p-5 text-center">
                            <h2 className="card-title mb-4 fw-bold" data-aos="fade-up">
                                Painel do Mentor
                            </h2>

                            {/* Botões de Navegação */}
                            <Row className="mb-4 justify-content-center" data-aos="fade-up" data-aos-delay="100">
                                <Col md="4" className="mb-2">
                                    <Link to="/mentor-perfil" className="w-100">
                                        <Button variant="outline-info" className="w-100">
                                            <FontAwesomeIcon icon={faUser} className="me-2" /> Perfil
                                        </Button>
                                    </Link>
                                </Col>
                                <Col md="4" className="mb-2">
                                    <Link to="/mentor-request" className="w-100">
                                        <Button variant="outline-warning" className="w-100">
                                            <FontAwesomeIcon icon={faListAlt} className="me-2" /> Solicitações
                                            {statusCounts.pendentes > 0 && (
                                                <Badge pill bg="danger" className="ms-2">{statusCounts.pendentes}</Badge>
                                            )}
                                        </Button>
                                    </Link>
                                </Col>
                                <Col md="4" className="mb-2">
                                    <Link to="/mentor-history" className="w-100">
                                        <Button variant="outline-success" className="w-100">
                                            <FontAwesomeIcon icon={faHistory} className="me-2" /> Realizadas
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>

                            {/* Resumo de Status */}
                            <div className="mb-4" data-aos="fade-up" data-aos-delay="200">
                                <h4 className="mb-3">Resumo de Status</h4>
                                <p>
                                    Aprovadas: <Badge pill bg="success">{statusCounts.aprovadas}</Badge>{' '}
                                    Pendentes: <Badge pill bg="warning">{statusCounts.pendentes}</Badge>{' '}
                                    Recusadas: <Badge pill bg="danger">{statusCounts.recusadas}</Badge>{' '}
                                    Realizadas: <Badge pill bg="info">{statusCounts.realizadas}</Badge>
                                </p>
                            </div>

                            {/* Ações Rápidas */}
                            {mentoriasPendentes.length > 0 && (
                                <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
                                    <h4 className="mb-3">Ações Rápidas - Mentorias Pendentes</h4>
                                    <ListGroup>
                                        {mentoriasPendentes.map(mentoria => (
                                            <ListGroup.Item
                                                key={mentoria.id}
                                                className="bg-secondary text-light border-light mb-2 rounded-3 d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <h6 className="mb-1">{mentoria.titulo}</h6>
                                                    <p className="mb-0">
                                                        <strong className="text-white">
                                                            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                                            {mentoria.data}
                                                        </strong>
                                                    </p>
                                                    <p className="mb-0 small">{mentoria.descricao.substring(0, 50)}...</p>
                                                </div>
                                                <div>
                                                    <Button variant="success" size="sm" className="me-2" onClick={() => handleAprovarMentoria(mentoria.id)}>
                                                        <FontAwesomeIcon icon={faCheck} /> Aprovar
                                                    </Button>
                                                    <Button variant="danger" size="sm" onClick={() => handleRecusarMentoria(mentoria.id)}>
                                                        <FontAwesomeIcon icon={faTimes} /> Recusar
                                                    </Button>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}

                            {/* Lista de Todas as Mentorias */}
                            <div data-aos="fade-up" data-aos-delay="400">
                                <h4 className="mb-3">Todas as Mentorias</h4>
                                {mentorias.length > 0 ? (
                                    <ListGroup className="mt-4">
                                        {mentorias.map(mentoria => (
                                            <ListGroup.Item
                                                key={mentoria.id}
                                                className="bg-secondary text-light border-light mb-2 rounded-3 d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <h5 className="mb-1">{mentoria.titulo}</h5>
                                                    <p className="mb-0">
                                                        <strong className="text-white">
                                                            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                                            {mentoria.data}
                                                        </strong>
                                                        <Badge pill bg={
                                                            mentoria.status === 'aprovada' ? 'success' :
                                                                mentoria.status === 'pendente' ? 'warning' :
                                                                    mentoria.status === 'recusada' ? 'danger' :
                                                                        'info'
                                                        } className="ms-2">{mentoria.status.toUpperCase()}</Badge>
                                                    </p>
                                                    <p className="mb-0 small">{mentoria.descricao.substring(0, 100)}...</p>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="outline-light"
                                                        size="sm"
                                                        onClick={() => handleVerDetalhes(mentoria)}
                                                    >
                                                        Ver Detalhes
                                                    </Button>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p className="mt-3">Nenhuma mentoria encontrada.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Detalhes */}
            <Modal show={showModal} onHide={handleCloseModal} centered className="bg-dark text-light">
                {selectedMentoria && (
                    <>
                        <Modal.Header closeButton className="bg-dark text-light border-secondary">
                            <Modal.Title>{selectedMentoria.titulo}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark text-light border-secondary">
                            <p>
                                <strong>
                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                    {selectedMentoria.data}
                                </strong>
                            </p>
                            <p><strong>Descrição:</strong> {selectedMentoria.descricao}</p>
                            <p><strong>Status:</strong> <Badge bg={
                                selectedMentoria.status === 'aprovada' ? 'success' :
                                    selectedMentoria.status === 'pendente' ? 'warning' :
                                        selectedMentoria.status === 'recusada' ? 'danger' :
                                            'info'
                            }>{selectedMentoria.status.toUpperCase()}</Badge></p>
                            {/* Aqui você pode adicionar outros detalhes da mentoria */}
                        </Modal.Body>
                        <Modal.Footer className="bg-dark text-light border-secondary">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Fechar
                            </Button>
                            <Link to={`/mentorias/${selectedMentoria.id}`}>
                                <Button variant="primary">Ir para a Página da Mentoria</Button>
                            </Link>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default MentorHome;