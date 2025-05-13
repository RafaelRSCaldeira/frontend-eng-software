import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

function PerfilMentor() {
    const navigate = useNavigate();
    const mentorId = 1; // Simulação do ID do mentor
    const [mentorData, setMentorData] = useState({
        nome: 'João da Silva',
        email: 'joao.silva@email.com',
        bio: 'Mentor experiente em desenvolvimento de software...',
        especialidade: 'Desenvolvimento Web (React, Node.js)',
        // ... outros dados do mentor
    });
    const [editing, setEditing] = useState(false);
    const [tempData, setTempData] = useState({ ...mentorData });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditarPerfil = () => {
        setEditing(true);
    };

    const handleSalvarPerfil = () => {
        // Aqui você faria a chamada à API para salvar as alterações do perfil
        console.log('Dados do perfil a serem salvos:', tempData);
        setMentorData(tempData);
        setEditing(false);
        // Exibir uma mensagem de sucesso para o usuário
    };

    const handleCancelarEdicao = () => {
        setTempData(mentorData);
        setEditing(false);
    };

    const handleInformarDisponibilidade = () => {
        navigate('/mentor/disponibilidade');
    };

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
            <Card className="shadow-lg border-0 rounded-4 bg-dark text-light p-5" data-aos="zoom-in" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Body className="text-center">
                    <h2 className="card-title mb-4 fw-bold" data-aos="fade-up">Meu Perfil</h2>

                    {editing ? (
                        <Form data-aos="fade-up" data-aos-delay="100">
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" name="nome" value={tempData.nome} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={tempData.email} onChange={handleChange} readOnly />
                                <Form.Text className="text-muted">O email não pode ser alterado.</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control as="textarea" name="bio" value={tempData.bio} onChange={handleChange} rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Especialidade</Form.Label>
                                <Form.Control type="text" name="especialidade" value={tempData.especialidade} onChange={handleChange} />
                            </Form.Group>
                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="secondary" onClick={handleCancelarEdicao}>Cancelar</Button>
                                <Button variant="primary" onClick={handleSalvarPerfil}>Salvar</Button>
                            </div>
                        </Form>
                    ) : (
                        <div data-aos="fade-up" data-aos-delay="100" className="text-start">
                            <p><strong>Nome:</strong> {mentorData.nome}</p>
                            <p><strong>Email:</strong> {mentorData.email}</p>
                            <p><strong>Bio:</strong> {mentorData.bio}</p>
                            <p><strong>Especialidade:</strong> {mentorData.especialidade}</p>
                            {/* Exiba outros dados do mentor aqui */}
                            <Button variant="outline-primary" className="mt-3" onClick={handleEditarPerfil}>Editar Perfil</Button>
                        </div>
                    )}

                    <Button variant="info" className="mt-4" onClick={handleInformarDisponibilidade} data-aos="fade-up" data-aos-delay="200">
                        Informar nova disponibilidade
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default PerfilMentor;