import React from "react";

const TestimonialsSection = () => (
  <section
    id="testimonials"
    className="d-flex justify-content-center align-items-center text-white"
    style={{
      height: "100vh",
      backgroundColor: "rgba(33, 37, 41, 0.95)", // dark semi-transparent
      padding: "2rem 0",
    }}
  >
    <div className="container">
      {/* Título da seção */}
      <div className="text-center mb-5" data-aos="fade-up">
        <h2>O que nossos mentorados dizem</h2>
      </div>

      {/* Cards de depoimentos */}
      <div className="row g-4 mb-5">
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="testimonial-card p-4 bg-dark rounded shadow text-center h-100">
            <p className="testimonial-text">
              "A mentoria transformou minha carreira. Em 6 meses, consegui uma
              promoção e melhorei significativamente minhas habilidades."
            </p>
            <p className="testimonial-author">- Maria Silva, Desenvolvedora</p>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="testimonial-card p-4 bg-dark rounded shadow text-center h-100">
            <p className="testimonial-text">
              "O acompanhamento personalizado fez toda a diferença. Meu mentor
              me ajudou a identificar e superar meus pontos fracos."
            </p>
            <p className="testimonial-author">- João Santos, Analista de Dados</p>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div className="testimonial-card p-4 bg-dark rounded shadow text-center h-100">
            <p className="testimonial-text">
              "A flexibilidade dos horários e a qualidade dos mentores são
              impressionantes. Recomendo fortemente!"
            </p>
            <p className="testimonial-author">- Ana Costa, Gerente de Projetos</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
