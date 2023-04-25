import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
function SearchBar(props) {
  return (
    <div className='SearchBar' >
    <input type="text" className='SearchBox' placeholder='Search HelpHaven...' />
    <div className="SearchIcon hoverEffects">
      <AiOutlineSearch/>
    </div>
  </div>
  )
}

export default SearchBar