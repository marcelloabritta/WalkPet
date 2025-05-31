import React from 'react';
import pata from '../../assets/pataWalk.png';
import gato from "../../assets/gatoBuraco.png";
import './style.css';
import { Link } from 'react-router-dom';

const Sobre = () => {
  return (
    <div className="sobre-page">
      <div className="sobre">
        <h1 className="sobre-title">Sobre Nós</h1>
        <div className="sobre-container">
          <div className="sobre-left">
            <img src={pata} alt="Pata decorativa" className='sobre-img-left' />
            <div className="sobre-content">
              <h2 className="sobre-subtitle">
                Bem-vindo ao WalkPet, o seu destino confiável para passeios de pets!
              </h2>
              <p className="sobre-text">
                Nossa missão é proporcionar momentos de felicidade e bem-estar para os seus amigos de quatro patas. Fundada por amantes de animais, nossa equipe é composta por passeadores experientes e apaixonados que entendem a importância de manter seu pet ativo e socializado.
                <br /><br />
                Aqui, priorizamos a segurança e a diversão, oferecendo passeios personalizados que se adaptam às necessidades de cada animal. Junte-se a nós e veja seu pet explorar o mundo com alegria e energia!
              </p>
              <div className="sobre-buttons">
                <Link to="/cadastro" className="sobre-button">Cadastre-se</Link>
                <Link to="/servicos" className="sobre-button sobre-button-secondary">Nossos Serviços</Link>
              </div>
            </div>
          </div>
          
          <div className="sobre-right">
            <div className="sobre-card">
              <h3 className="sobre-number">+7 mil</h3>
              <p className="sobre-label">passeadores avaliados</p>
            </div>
            
            <div className="sobre-card sobre-card-highlight">
              <h3 className="sobre-number">+34 mil</h3>
              <p className="sobre-label">passeios realizados</p>
            </div>
            
            <div className="sobre-image-container">
              <img src={gato} alt="Gato fofo" className="sobre-featured-image" />
              <div className="sobre-image-overlay">
                <p>Seu pet merece o melhor cuidado!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;