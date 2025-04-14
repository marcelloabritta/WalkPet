import React from 'react'
import '../SouPasseadorButton/style.css'
import { Link } from 'react-router-dom'

const SouPasseador = () => {
  return (
    <div>
      <Link to="/Login">
      <button className='sou-passeador-btn'>Sou um passeador</button>
      </Link>
    </div>
  )
}

export default SouPasseador
