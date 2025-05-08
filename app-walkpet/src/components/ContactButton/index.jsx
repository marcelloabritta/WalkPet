import React from 'react'
import '../ContactButton/style.css'
import { Link } from 'react-router-dom'

const ContactBtn = () => {
  return (
    <div>
      <Link to='/Contato'>
      <button className='contact-btn'>Desejo contactar</button>
      </Link>
    </div>
  )
}

export default ContactBtn
