import React from "react";

const FeaturesSection = () => (
  <section
    id="features"
    className="d-flex justify-content-center align-items-center text-white"
    style={{
      height: "100vh",
      backgroundColor: "rgba(33, 37, 41, 0.95)", // dark semi-transparent
      overflowY: "auto", // permite rolar o conteúdo interno caso ultrapasse 100vh
      padding: "2rem 0",
    }}
  >
    <div className="container">
      {/* Título da seção */}
      <div className="text-center mb-5" data-aos="fade-up">
        <h2>Por que escolher nossa plataforma?</h2>
      </div>

      {/* Cards de funcionalidades */}
      <div className="row g-4 mb-5">
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="feature-card p-4 bg-dark rounded shadow text-center h-100">
            <i className="fas fa-users fa-3x mb-3 text-primary"></i>
            <h4>Mentores Qualificados</h4>
            <p>Conecte-se com profissionais experientes e certificados em diversas áreas.</p>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="feature-card p-4 bg-dark rounded shadow text-center h-100">
            <i className="fas fa-chart-line fa-3x mb-3 text-success"></i>
            <h4>Desenvolvimento Contínuo</h4>
            <p>Acompanhe seu progresso com métricas e feedbacks personalizados.</p>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div className="feature-card p-4 bg-dark rounded shadow text-center h-100">
            <i className="fas fa-calendar-check fa-3x mb-3 text-warning"></i>
            <h4>Flexibilidade Total</h4>
            <p>Agende suas sessões de mentoria no horário que melhor se adequa à sua rotina.</p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="row text-center">
        <div className="col-md-3 mb-4" data-aos="fade-up">
          <div className="p-3 bg-secondary rounded shadow">
            <div className="h2">1000+</div>
            <p>Mentorados Ativos</p>
          </div>
        </div>
        <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div className="p-3 bg-secondary rounded shadow">
            <div className="h2">500+</div>
            <p>Mentores Certificados</p>
          </div>
        </div>
        <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div className="p-3 bg-secondary rounded shadow">
            <div className="h2">95%</div>
            <p>Satisfação</p>
          </div>
        </div>
        <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div className="p-3 bg-secondary rounded shadow">
            <div className="h2">24/7</div>
            <p>Suporte</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
