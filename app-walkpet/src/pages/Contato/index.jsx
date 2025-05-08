import React from 'react'
import '../Contato/style.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


const Contato = () => {
    return (
        <div className='contato-page'>

            <h2>Fale com a gente!</h2>

            <div className="contato">
                <div className="contato-cointainer">
                    <div className="left">
                        <div className="left-top">
                            <h3>Informações de contato</h3>
                            <p><FontAwesomeIcon icon={faPhoneVolume} /><span>+55 (31) 99991-1308</span></p><br />
                            <p><FontAwesomeIcon icon={faEnvelope} /><span>walkpet@gmail.com</span></p><br />
                            <p><FontAwesomeIcon icon={faLocationDot} /><span>Belo Horizonte, MG</span></p><br />

                        </div>

                        <div className="left-bottom">
                            <p><FontAwesomeIcon icon={faInstagram} /></p>
                            <p><FontAwesomeIcon icon={faTwitter} /></p>
                            <p><FontAwesomeIcon icon={faFacebookF} /></p>
                        </div>

                    </div>
                    <div className="right">
                        <label htmlFor="">Nome:</label>
                        <input type="text" placeholder='nome' />
                        <label htmlFor="">Email:</label>
                        <input type="email" placeholder='example@email.com' />
                        <label htmlFor="">Mensagem:</label>
                        <textarea name="" id="" rows={8} placeholder='mensagem'></textarea>
                        <button>Enviar</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contato
