import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock} from '@fortawesome/free-regular-svg-icons'
import '../TimeBtn/style.css'

const TimeBtn = () => {
    const [horario, setHorario] = useState('')

    
  return (
    <div className='time-btn'>
       <label htmlFor="horario">
       <FontAwesomeIcon icon={faClock} className='clock-icon' /> 
      </label>

      <input
        id="horario"
        type="time"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      />
    </div>
  )
}

export default TimeBtn
