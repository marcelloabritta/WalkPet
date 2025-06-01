import React from 'react';
import pata from '../../assets/pataWalk.png'
import pet from '../../assets/pet.png'
import gato from "../../assets/gatoBuraco.png"
import './style.css';
import { Link } from 'react-router-dom';

const Sobre = () => {
  return (
    <div>
      <div className="sobre">
        <h1>Sobre Nós</h1>
        <div className="sobre-container">
          <div className="left">
            <img src={pata} alt="" className='img-left' />
            <div className="left-top">
              <h2>
                Bem-vindo ao WalkPet, o seu destino confiável para passeios de pets!
              </h2>
              <p>
                Nossa missão é proporcionar momentos de felicidade e bem-estar para os seus amigos de quatro patas. Fundada por amantes de animais, nossa equipe é composta por passeadores experientes e apaixonados que entendem a importância de manter seu pet ativo e socializado. Aqui, priorizamos a segurança e a diversão, oferecendo passeios personalizados que se adaptam às necessidades de cada animal.
                <br />Junte-se a nós e veja seu pet explorar o mundo com alegria e energia!
              </p>
              <img src={pata} alt="" className='img-right' />
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <h3>+7 mil <br /> passeadores <br />avaliados</h3>
            </div>
            <div className="right-mid">
              <h3>+34 mil <br /> passeios <br />realizados</h3>
            </div>
            <div className="right-bottom">
              <img src={gato} alt="walkpet logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;