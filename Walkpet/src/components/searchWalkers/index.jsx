import React from 'react'
import '../searchWalkers/style.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchWalkers = ({children, className, style}) => {
  return (
    <div className='input-wrapper' className={className}>
      <input type="text" placeholder='buscar por passeadores'/>
      <FontAwesomeIcon icon={faSearch} className='search-icon'/>
    </div>
  )
}

export default SearchWalkers
