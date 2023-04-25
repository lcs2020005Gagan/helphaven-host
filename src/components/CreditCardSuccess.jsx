import React,{useState} from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import ButtonComp from './ButtonComp';
import { Link, useLocation } from 'react-router-dom';
import thanks from '../thankyounotes'

function CreditCardSuccess() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const profile = searchParams.get('authname');
    const cardId = searchParams.get('cardId');
    const source = searchParams.get('source');
    const profileimg = searchParams.get('authprofile');
  console.log(thanks);
    const [loading, setLoading] = useState(true);
    setTimeout(()=>{
        setLoading(false);
    },source==="metamask"?9000:4000);


  return (<>   {loading?source==="creditcard"?(<Player
    autoplay
    loop
    src="https://assets8.lottiefiles.com/packages/lf20_jffprore.json"
    style={{height:'30rem',width: '30rem'}}
  >
  </Player>): (<Player
    autoplay
    loop
    src="https://assets4.lottiefiles.com/packages/lf20_DV5KsPrQIn.json"
    style={{height:'30rem',width: '30rem'}}
  >
  </Player>)
  :(<div className='CreditCardSuccess'>
        <div style={{"marginTop":"5rem"}}>
           

{source==="creditcard"?<Player
  autoplay
  keepLastFrame
  src="https://assets1.lottiefiles.com/packages/lf20_k6ciq2nn.json"
  style={{height:'30rem',width: '30rem'}}
>
</Player>:
<Player
  autoplay
  keepLastFrame
  src="https://assets8.lottiefiles.com/packages/lf20_baBApFTESP.json"
  style={{height:'30rem',width: '30rem'}}
>
</Player>}
        </div>
    <div className="dfc-c">
        <h2>
            Transaction successful
        </h2>
        <div className="ok" style={{"display":"flex","gap":"0.5rem"}}>

        <div className="ok" style={{"display":"flex","flexDirection":"column","marginRight":"auto","marginLeft":"3rem"}}>
           <img src={profileimg} alt="" style={{"width":"4rem","height":"4rem","borderRadius":"50%"}} />
           </div>
        <h6 >
            <span style={{"color":"white"}}>
            {profile} : 
            </span>
            <br/>
             {
              thanks[Math.floor(Math.random()*(50))]
             }
        </h6>
        </div>
        <div className="ok"  style={{"marginTop":"2rem","display":"flex","gap":"0.5rem"}}>
        <Link  to={`/story/${cardId}`} className="ok" style={{"width":"10rem"}}>
            <ButtonComp title="Back"/>
        </Link>
        <Link  to="/" className="ok" style={{"width":"10rem"}}>
            <ButtonComp title="Continue Donating"/>
        </Link>
        </div>
    </div>
    </div>
  )
    }
    </>
  )
}

export default CreditCardSuccess