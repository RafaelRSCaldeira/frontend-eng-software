import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    areaInteresse: ''
  });

  const areasDeInteresse = [
    'Desenvolvimento Frontend',
    'Desenvolvimento Backend',
    'DevOps',
    'UX/UI Design',
    'Análise de Dados',
    'Inteligência Artificial',
    'Segurança da Informação',
    'Cloud Computing'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Dados do formulário:', formData);
    // Após o cadastro bem-sucedido, redirecionar para a página de login
    navigate('/login');
  };

  return (
    <Container fluid className="register-page py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Cadastro</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Digite seu nome completo"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Digite seu e-mail"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Área de Interesse</Form.Label>
                  <Form.Select
                    name="areaInteresse"
                    value={formData.areaInteresse}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma área</option>
                    {areasDeInteresse.map((area, index) => (
                      <option key={index} value={area}>
                        {area}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    placeholder="Digite sua senha"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                    placeholder="Confirme sua senha"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Cadastrar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage; 