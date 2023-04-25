import React from 'react'
import Followers from './Followers'
import SearchUser from './SearchUser'
import TopDonors from './TopDonors'
import TopTrending from './TopTrending'

function RightNavBarForChat(props) {
  return (
    <div className='RightNavBar'>
        <SearchUser receiver={props.receiver} setReceiver={props.setReceiver}/>
        
    </div>
  )
}

export default RightNavBarForChat;