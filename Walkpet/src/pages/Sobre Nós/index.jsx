
import React from 'react';
import blueDog from '../../assets/blue-dog.png';
import walkPetLogo from '../../assets/walkpet_logo.png';
import pet from '../../assets/pet.png'
import blueCat from '../../assets/blue-cat.png';
import whiteCat from '../../assets/white-cat.png';
import blueWhiteCat from '../../assets/blue-white-cat.png';
import './style.css';
import { Link } from 'react-router-dom';

const Sobre = () => {
  return (
    <div>
      <div className="sobre">
        <div className="breadcrumb-sobre">
          <Link to={'/'} className='breadcrumb-txt'>&lt;</Link>
          <h3>Sobre Nós</h3>
        </div>
        <div className="sobre-container">
          <div className="left">
            <div className="left-top">
              <h2>
                Bem-vindo ao WalkPet!
              </h2>
              <p>
                O seu destino confiável para passeios de pets!
                Nossa missão é proporcionar momentos de felicidade e bem-estar para os seus amigos de quatro patas. Fundada por amantes de animais, nossa equipe é composta por passeadores experientes e apaixonados que entendem a importância de manter seu pet ativo e socializado. Aqui, priorizamos a segurança e a diversão, oferecendo passeios personalizados que se adaptam às necessidades de cada animal.
                Junte-se a nós e veja seu pet explorar o mundo com alegria e energia!
              </p>
            </div>
            <div className="left-bottom">
              <Link to='/login'>Junte-se a nós <img src={pet} alt="pet" /></Link>
              <Link to='/passeadores'>Procuro um passeador <img src={pet} alt="pet" /></Link>

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
              <img src={walkPetLogo} alt="walkpet logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
