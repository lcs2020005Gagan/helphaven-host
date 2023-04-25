import React from 'react'
import ButtonComp from './ButtonComp'

function DontWantToChat() {
  return (
    <div className='DontWantToChat'>
        <img src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices.png" alt="" />
        <h2>You have turned off chatting feature</h2>
        <h4>Turn on Chatting feature to connect with friends and other people online.</h4>
        <div style={{"width":"80%"}}>

        <ButtonComp title="Turn On"/>
        </div>
    </div>
  )
}

export default DontWantToChat