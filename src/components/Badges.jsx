import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';

function Badges(props) {
  return (
    <div>
{props.select==="silver"&&<Player
  autoplay
  keepLastFrame
  src="https://assets5.lottiefiles.com/private_files/lf30_n44aMN.json"
  style={{height:'10rem',width: '10rem'}}

>
</Player>}
{props.select==="gold"&&<Player
  autoplay
  keepLastFrame
  src="https://assets9.lottiefiles.com/packages/lf20_BCXrjU.json"
  style={{height:'5rem',width: '5rem'}}
>
</Player>}
    </div>
  )
}

export default Badges