  import React, { useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faBars, faHouse, faUser, faPerson, faQuestion, faNewspaper, faTimes , faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
  import walkPetLogo from '../../assets/walkpet.png'
  import { useUser } from '../../context/UserContext';
  import { Link, useNavigate} from 'react-router-dom';

  import '../Header/style.css'

  const Header = () => {


    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useUser();
    const navigate = useNavigate(); 

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
      setIsOpen(false);
    };

    const handleLogout = () => {
      logout(); 
      navigate('/'); 
  };


    return (
      <div className="header">
        <div className='header-container'>
          <Link to="/"><img src={walkPetLogo} alt="walkpet logo" /></Link>
          <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={toggleMenu}/>
        </div>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
      <div className={`side-bar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleMenu}><FontAwesomeIcon icon={faTimes} className='menu-icons'/></button>
          <nav>
            <ul>
              <li><FontAwesomeIcon icon={faHouse} className='menu-icons'/><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><FontAwesomeIcon icon={faUser} className='menu-icons'/>
              {user ? (
                  <Link to="/perfil" onClick={closeMenu}>Perfil</Link>
                ) : (
                  <Link to="/login" onClick={closeMenu}>Login</Link>
                )}
                </li>
              <li><FontAwesomeIcon icon={faPerson} className='menu-icons'/><Link to="/Passeadores" onClick={closeMenu}>Passeadores</Link></li>
              <li><FontAwesomeIcon icon={faQuestion} className='menu-icons'/><Link to="/contato" onClick={closeMenu}>Ajuda</Link></li>
              <li><FontAwesomeIcon icon={faNewspaper} className='menu-icons'/><Link to="/sobre" onClick={closeMenu}>Sobre Nós</Link></li>
              {user && (
                <li>
                <FontAwesomeIcon icon={faRightFromBracket} className='menu-icons' />
                <Link to="/" onClick={() => { closeMenu(); handleLogout(); }}>Logout</Link>
            </li>
              )}
            </ul>
          </nav>

      </div>
      </div>
    )
  }

  export default Header
