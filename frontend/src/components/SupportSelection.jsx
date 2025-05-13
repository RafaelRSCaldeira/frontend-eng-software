import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import supportIcon from '../assets/supportIcon.jpg'
import mentoredIcon from '../assets/mentoredIcon.jpg'
import mentorIcon from '../assets/mentorIcon.jpg'

const SupportSelection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-light">
      <h2 className="text-center mb-5 fw-bold" data-aos="fade-up">
        Painéis de Gerenciamento
      </h2>
      <div className="row w-100 justify-content-center g-4 px-3">
        {/* Card Mentores */}
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="100">
          <div className="card bg-secondary text-light shadow-lg border-0 rounded-4 h-100 hover-zoom">
            <img
              src={mentorIcon}
              className="card-img-top rounded-top-4"
              alt="Mentores"
              style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Gerenciar Mentores</h5>
              <p className="card-text">Visualize e administre os dados dos mentores.</p>
              <Link to="/users/mentor" className="btn btn-outline-light mt-3">
                Acessar painel
              </Link>
            </div>
          </div>
        </div>

        {/* Card Mentorados */}
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
          <div className="card bg-secondary text-light shadow-lg border-0 rounded-4 h-100 hover-zoom">
            <img
              src={mentoredIcon}
              className="card-img-top rounded-top-4"
              alt="Mentorados"
              style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Gerenciar Mentorados</h5>
              <p className="card-text">Visualize e administre os dados dos mentorados.</p>
              <Link to="/users/mentored" className="btn btn-outline-light mt-3">
                Acessar painel
              </Link>
            </div>
          </div>
        </div>

        {/* Card Suporte */}
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="300">
          <div className="card bg-secondary text-light shadow-lg border-0 rounded-4 h-100 hover-zoom">
            <img
              src={supportIcon}
              className="card-img-top rounded-top-4"
              alt="Suporte"
              style={{ objectFit: 'contain', height: '200px' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Gerenciar Suporte</h5>
              <p className="card-text">Visualize e administre os dados dos suportes.</p>
              <Link to="/users/support" className="btn btn-outline-light mt-3">
                Acessar painel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSelection;
