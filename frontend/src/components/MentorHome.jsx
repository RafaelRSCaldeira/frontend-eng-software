import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MentorHome() {
    const [mentorias, setMentorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const mentorId = 1;
    const [showModal, setShowModal] = useState(false);
    const [selectedMentoria, setSelectedMentoria] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        async function carregarMentorias() {
            setLoading(true);
            setErro(null);
            try {
                const exemploMentorias = [
                    { id: 1, titulo: 'Mentoria de React Avançado', descricao: 'Foco em Hooks e Context API. Abordaremos os Hooks mais importantes como useState, useEffect e useContext, além de explorar o Context API para gerenciamento de estado em aplicações React complexas.', data: '2025-05-15' },
                    { id: 2, titulo: 'Otimização de Performance em Front-end', descricao: 'Dicas e técnicas para deixar seu app rápido. Aprenda a identificar gargalos de performance, otimizar a renderização, usar técnicas de lazy loading e outras estratégias para melhorar a velocidade e a responsividade do seu frontend.', data: '2025-05-22' },
                    { id: 3, titulo: 'Testes Unitários em React', descricao: 'Guia completo para escrever testes unitários eficazes em aplicações React utilizando Jest e React Testing Library.', data: '2025-06-01' },
                ];
                const mentoriasFormatadas = exemploMentorias.map(mentoria => ({
                    ...mentoria,
                    data: new Date(mentoria.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
                }));
                setMentorias(mentoriasFormatadas);
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
                                Minhas Mentorias
                            </h2>
                            {mentorias.length > 0 ? (
                                <ListGroup className="mt-4" data-aos="fade-up" data-aos-delay="100">
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
                                                </p>
                                                <p className="mb-0 small">{mentoria.descricao.substring(0, 100)}...</p>
                                            </div>
                                            <Button
                                                variant="outline-light" // Cor inicial cinza/claro
                                                size="sm"
                                                onClick={() => handleVerDetalhes(mentoria)}
                                            >
                                                Ver Detalhes
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p className="mt-3" data-aos="fade-up" data-aos-delay="100">
                                    Nenhuma mentoria associada a este mentor.
                                </p>
                            )}
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