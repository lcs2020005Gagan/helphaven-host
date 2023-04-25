import React from 'react'
import { Link } from 'react-router-dom'

function TopTrendingCard(props) {
  
  return (
    <div className='TopTrendingCard'>
        <Link to={`/story/${props.element._id}`} style={{"color":"white"}}>
        <div className="TopTrendingCardName textClip-1">
            {props.element.title}
        </div>
        <div className="TopTrendingCardDonations">
            {props.element.donations} donations
        </div>
        </Link>
    </div>
  )
}

export default TopTrendingCard