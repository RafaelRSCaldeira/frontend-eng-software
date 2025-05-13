import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Button, Modal, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MentorRequests() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const mentorId = 1; // Simulação do ID do mentor
    const [showModalDetalhes, setShowModalDetalhes] = useState(false);
    const [solicitacaoDetalhe, setSolicitacaoDetalhe] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        async function carregarSolicitacoes() {
            setLoading(true);
            setErro(null);
            try {
                // Simulação da chamada à API para obter mentorias pendentes
                const exemploSolicitacoes = [
                    { id: 101, aluno: 'Maria Souza', dataSolicitacao: '2025-05-16', topico: 'React Hooks', descricao: 'Gostaria de aprender sobre useState e useEffect...', status: 'pendente' },
                    { id: 102, aluno: 'Pedro Almeida', dataSolicitacao: '2025-05-17', topico: 'Performance Front-end', descricao: 'Tenho dúvidas sobre otimização de renderização...', status: 'pendente' },
                    { id: 103, aluno: 'Ana Clara', dataSolicitacao: '2025-05-18', topico: 'Testes Unitários', descricao: 'Preciso de ajuda para configurar Jest...', status: 'pendente' },
                ];
                setSolicitacoes(exemploSolicitacoes);
            } catch (error) {
                console.error('Erro ao carregar solicitações:', error);
                setErro('Erro ao carregar as solicitações de mentoria.');
            } finally {
                setLoading(false);
            }
        }

        carregarSolicitacoes();
    }, [mentorId]);

    const handleAprovarSolicitacao = async (id) => {
        // Simulação da chamada à API para aprovar a solicitação
        console.log(`Solicitação ${id} aprovada!`);
        // Atualizar o estado local após a aprovação bem-sucedida
        setSolicitacoes(solicitacoes.filter(s => s.id !== id));
    };

    const handleRecusarSolicitacao = async (id) => {
        // Simulação da chamada à API para recusar a solicitação
        console.log(`Solicitação ${id} recusada!`);
        // Atualizar o estado local após a recusa bem-sucedida
        setSolicitacoes(solicitacoes.filter(s => s.id !== id));
    };

    const handleVerDetalhes = (solicitacao) => {
        setSolicitacaoDetalhe(solicitacao);
        setShowModalDetalhes(true);
    };

    const handleFecharModalDetalhes = () => {
        setShowModalDetalhes(false);
        setSolicitacaoDetalhe(null);
    };

    if (loading) {
        return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">Carregando solicitações...</div>;
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
                    <h2 className="card-title mb-4 fw-bold" data-aos="fade-up">Solicitações de Mentoria</h2>
                    {solicitacoes.length > 0 ? (
                        <ListGroup className="mt-4" data-aos="fade-up" data-aos-delay="100">
                            {solicitacoes.map(solicitacao => (
                                <ListGroup.Item
                                    key={solicitacao.id}
                                    className="bg-secondary text-light border-light mb-2 rounded-3 d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h6 className="mb-1"><strong>Aluno:</strong> {solicitacao.aluno}</h6>
                                        <p className="mb-0"><strong>Tópico:</strong> {solicitacao.topico}</p>
                                        <p className="mb-0 small"><strong>Data da Solicitação:</strong> {solicitacao.dataSolicitacao}</p>
                                    </div>
                                    <div>
                                        <Button variant="success" size="sm" className="me-2" onClick={() => handleAprovarSolicitacao(solicitacao.id)}>
                                            <FontAwesomeIcon icon={faCheck} /> Aprovar
                                        </Button>
                                        <Button variant="danger" size="sm" className="me-2" onClick={() => handleRecusarSolicitacao(solicitacao.id)}>
                                            <FontAwesomeIcon icon={faTimes} /> Recusar
                                        </Button>
                                        <Button variant="info" size="sm" onClick={() => handleVerDetalhes(solicitacao)}>
                                            <FontAwesomeIcon icon={faInfoCircle} /> Detalhes
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="mt-3" data-aos="fade-up" data-aos-delay="100">Nenhuma solicitação de mentoria pendente.</p>
                    )}
                </Card.Body>
            </Card>

            {/* Modal de Detalhes da Solicitação */}
            <Modal show={showModalDetalhes} onHide={handleFecharModalDetalhes} centered className="bg-dark text-light">
                {solicitacaoDetalhe && (
                    <>
                        <Modal.Header closeButton className="bg-dark text-light border-secondary">
                            <Modal.Title>Detalhes da Solicitação</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark text-light border-secondary">
                            <p><strong>Aluno:</strong> {solicitacaoDetalhe.aluno}</p>
                            <p><strong>Data da Solicitação:</strong> {solicitacaoDetalhe.dataSolicitacao}</p>
                            <p><strong>Tópico:</strong> {solicitacaoDetalhe.topico}</p>
                            <p><strong>Descrição:</strong> {solicitacaoDetalhe.descricao}</p>
                            {/* Adicione mais detalhes conforme necessário */}
                        </Modal.Body>
                        <Modal.Footer className="bg-dark text-light border-secondary">
                            <Button variant="secondary" onClick={handleFecharModalDetalhes}>Fechar</Button>
                            <Button variant="success" onClick={() => handleAprovarSolicitacao(solicitacaoDetalhe.id)}>Aprovar</Button>
                            <Button variant="danger" onClick={() => handleRecusarSolicitacao(solicitacaoDetalhe.id)}>Recusar</Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default MentorRequests;