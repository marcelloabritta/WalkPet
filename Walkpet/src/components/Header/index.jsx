import React from 'react';
import walkPetLogo from '../../assets/walkpet.png'
import { useUser } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

import '../Header/style.css'

const Header = () => {



  const { user, logout } = useUser();
  const navigate = useNavigate();



  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <div className="header">
      <div className='header-container'>
        <Link to="/"><img src={walkPetLogo} alt="walkpet logo" /></Link>
        <nav>
          <ul>
            <li><Link to="/" className='link-header'>Início</Link></li>
            <li><Link to="/Passeadores" className='link-header'>Passeadores</Link></li>
            <li><Link to="/contato" className='link-header'>Contato</Link></li>
            <li><Link to="/sobre" className='link-header'>Sobre</Link></li>
          </ul>

        </nav>
        <div className="header-right">
        <li>
              {user ? (
                <>
                <button className='header-perfil-btn'><Link to="/perfil" className='header-perfil'>Perfil</Link></button>
                <Link to="/" onClick={() => { handleLogout(); }}>Logout</Link>
                </>
              ) : (
                <>
                <Link to="/login" className='header-login'>Entrar</Link>
                <button className='header-register-btn'><Link to="/register" className='header-register'>Cadastrar</Link></button>
                </>
              )}
            </li>
        </div>
      </div>

    </div>
  )
}

export default Header
