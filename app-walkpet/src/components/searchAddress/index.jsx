import React from 'react'
import '../searchAddress/style.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchAddress = () => {
  return (
    <div className='input-wrapper'>
      <FontAwesomeIcon icon={faSearch} className='search-icon'/>
      <input type="text" placeholder='Digite seu endereço'/>
    </div>
  )
}

export default SearchAddress
