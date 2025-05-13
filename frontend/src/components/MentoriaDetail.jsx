import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MentoriaDetalhe() {
    const { id } = useParams();
    const [mentoria, setMentoria] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        async function carregarMentoria() {
            setLoading(true);
            setErro(null);
            try {
                const exemploMentoria = {
                    id: parseInt(id),
                    titulo: `Mentoria de Exemplo ${id}`,
                    descricao: 'Esta é uma descrição detalhada da mentoria.',
                    data: '2025-05-25',
                    topicos: ['React Hooks', 'Gerenciamento de Estado', 'Testes Unitários'],
                    mentor: 'Nome do Mentor',
                };
                setMentoria(exemploMentoria);
            } catch (error) {
                console.error('Erro ao carregar detalhes da mentoria:', error);
                setErro('Erro ao carregar os detalhes desta mentoria.');
            } finally {
                setLoading(false);
            }
        }

        carregarMentoria();
    }, [id]);

    if (loading) {
        return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">Carregando detalhes da mentoria...</div>;
    }

    if (erro) {
        return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light"><p className="text-danger">Erro: {erro}</p></div>;
    }

    if (!mentoria) {
        return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light"><p>Mentoria não encontrada.</p></div>;
    }

    const formattedDate = new Date(mentoria.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light position-relative">
            <Link
                to="/mentor/home"
                className="position-absolute top-0 start-0 m-4 btn btn-outline-light d-flex align-items-center gap-2"
                style={{ zIndex: 10 }}
                data-aos="fade-down"
            >
                <i className="bi bi-arrow-left"></i> Voltar
            </Link>
            <div className="row justify-content-center w-100">
                <div className="col-lg-7 col-md-8 col-sm-10">
                    <div className="card shadow-lg border-0 rounded-4 bg-dark text-light p-5" data-aos="zoom-in">
                        <h2 className="card-title mb-4 fw-bold" data-aos="fade-up">{mentoria.titulo}</h2>
                        <p data-aos="fade-up" data-aos-delay="100">
                            <strong>
                                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                <span className="text-white">{formattedDate}</span>
                            </strong>
                        </p>
                        <p className="card-text mb-3" data-aos="fade-up" data-aos-delay="200">
                            <strong>Descrição:</strong> {mentoria.descricao}
                        </p>
                        {mentoria.topicos && mentoria.topicos.length > 0 && (
                            <div className="mb-3" data-aos="fade-up" data-aos-delay="300">
                                <strong>Tópicos Abordados:</strong>
                                <ul className="list-unstyled mt-2">
                                    {mentoria.topicos.map((topico, index) => (
                                        <li key={index}><i className="bi bi-check-circle-fill text-primary me-2"></i> {topico}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p data-aos="fade-up" data-aos-delay="400"><strong>Mentor:</strong> {mentoria.mentor}</p>

                        {/* Botão "Editar Mentoria" com a variante outline-secondary */}
                        <Button
                            variant="outline-secondary"
                            className="mt-3"
                        >
                            Editar Mentoria
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MentoriaDetalhe;