import React from 'react'
import '../PrecisoPasseadorButton/style.css'
import { Link } from 'react-router-dom'

const PrecisoPasseador = () => {
  return (
    <div>
      <Link to='/passeadores'>
      <button className='preciso-passeador-btn'>Preciso de um passeador</button>
      </Link>
    </div>
  )
}

export default PrecisoPasseador
