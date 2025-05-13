import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import AOS from 'aos/dist/aos';
import 'aos/dist/aos.css';

function MentorAvailability() {
    const navigate = useNavigate();
    const mentorId = 1; // Simulação do ID do mentor
    const [data, setData] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensagem('');

        const disponibilidade = {
            data: data,
            hora_inicio: horaInicio,
            hora_fim: horaFim,
        };

        try {
            const response = await fetch(`/mentores/${mentorId}/disponibilidade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(disponibilidade),
            });

            if (response.ok) {
                setMensagem('Disponibilidade informada com sucesso!');
                setData('');
                setHoraInicio('');
                setHoraFim('');
                // Redirecionar o mentor ou exibir outra ação
            } else {
                const errorData = await response.json();
                setMensagem(`Erro ao informar disponibilidade: ${errorData.mensagem || response.statusText}`);
            }
        } catch (error) {
            setMensagem(`Erro ao comunicar com o servidor: ${error.message}`);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light position-relative">
            <Link
                to="/mentor/perfil"
                className="position-absolute top-0 start-0 m-4 btn btn-outline-light d-flex align-items-center gap-2"
                style={{ zIndex: 10 }}
                data-aos="fade-down"
            >
                <i className="bi bi-arrow-left"></i> Voltar
            </Link>
            <Card className="shadow-lg border-0 rounded-4 bg-dark text-light p-5" data-aos="zoom-in" style={{ maxWidth: '400px', width: '100%' }}>
                <Card.Body className="text-center">
                    <h2 className="card-title mb-4 fw-bold" data-aos="fade-up">Informar Disponibilidade</h2>
                    <Form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
                        <Form.Group className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hora de Início</Form.Label>
                            <Form.Control type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hora de Fim</Form.Label>
                            <Form.Control type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Informar Disponibilidade'}
                        </Button>
                        {mensagem && <p className="mt-3 text-info">{mensagem}</p>}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MentorAvailability;