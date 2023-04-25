import React from 'react'
import nocontent from '../assets/nocontent.svg'
import { Player } from '@lottiefiles/react-lottie-player'

function NoContent(props) {
  return (
    <>
      <div className='NoContent'>
      <Player
  autoplay
  loop
  src="https://assets4.lottiefiles.com/private_files/lf30_e3pteeho.json"
  style={{height:'30rem',width: '30rem'}}
>
</Player>
<h2 style={{"color":"white"}}>Nothing here!</h2>
      </div>

    </>
  )
}

export default NoContent