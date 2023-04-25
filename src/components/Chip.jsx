import React from 'react'
import { Link } from 'react-router-dom'

function Chip(props) {
  return (
    <Link to={`/tag/${props.chip}`}>
        <div className='ChipJs'>{props.chip}</div>

    </Link>
  )
}

export default Chip