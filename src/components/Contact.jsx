import React from "react";

const Contact = () => {
  return (
  <section
      id="contact"
      className="d-flex justify-content-center align-items-center text-white"
      style={{
        height: "100vh",
        backgroundColor: "rgba(33, 37, 41, 0.95)"
      }}
    >
      <div className="container">
        <div className="row shadow-lg rounded bg-dark p-4">
          <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
            <h2 className="mb-3">Entre em Contato</h2>
            <p className="mb-4">Tem alguma dúvida? Estamos aqui para ajudar!</p>
            <div className="contact-info">
              <p>
                <i className="fas fa-envelope me-2"></i>
                contato@mentorados.com
              </p>
              <p>
                <i className="fas fa-phone me-2"></i>
                (11) 9999-9999
              </p>
              <p>
                <i className="fas fa-map-marker-alt me-2"></i>
                São Paulo, SP
              </p>
            </div>
          </div>

          <div className="col-md-6" data-aos="fade-left">
            <form id="contactForm">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Mensagem"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
)};

export default Contact;