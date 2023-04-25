import React from 'react'
import { Link } from 'react-router-dom'

function Chip2(props) {
  return (
    <Link to={`/tag/${props.chip}`}>
        <div className=' ChipJs ChipJs2'>{props.chip}</div>

    </Link>
  )
}

export default Chip2