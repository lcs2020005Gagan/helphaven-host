import React from 'react'
import Followers from './Followers'
import SearchBar from './SearchBar'
import TopDonors from './TopDonors'
import TopTrending from './TopTrending'
import BadgesArea from './BadgesArea'

function RightNavBar(props) {
  return (
    <div className='RightNavBar'>
      {props.location!=="profile"&&<SearchBar/>}
        {props.location==="profile"&&<BadgesArea/>}
        {props.location!=="profile"&&<TopTrending/>}
        {props.location!=="profile"&&<TopDonors/>}
        {props.location==="profile"&&<Followers title="Followers" followers={props.followers}/>}
        {props.location==="profile"&&<Followers title="Following" following={props.following}/>}
    </div>
  )
}

export default RightNavBar