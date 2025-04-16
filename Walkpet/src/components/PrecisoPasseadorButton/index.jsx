import React from 'react'
import '../PrecisoPasseadorButton/style.css'
import { Link } from 'react-router-dom'

const PrecisoPasseador = () => {
  return (
    <div>
      <Link to='/passeadores'>
      <button className='preciso-passeador-btn'>Sou dono de pet</button>
      </Link>
    </div>
  )
}

export default PrecisoPasseador
