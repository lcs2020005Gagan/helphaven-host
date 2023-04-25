import React, { Component ,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FaShareAlt} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {FiLogOut} from 'react-icons/fi';
import ReactCodeInput from 'react-verification-code-input';

import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  import { Link } from 'react-router-dom';
  import {FiLogIn} from 'react-icons/fi'
import ButtonComp from './ButtonComp';
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'hsla(0, 0%, 2%, 0.8)',
    boxShadow: 24,
    p: 4,
    fontFamily: '"Cascadia Code",Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace',
    
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const shareUrl = props.link;
  const navigate = useNavigate();

  const [note, setnote] = useState({email:"",password:""});
  const [up, setup] = useState({name:"" , about:"",email:"",password:"",bannerImg:"",profileImg:""});

  const handlechange=(e)=>{
    setnote({...note,   [e.target.name]:e.target.value})
  }
  const handlesubmit= async(e)=>{
    e.preventDefault();
    const email=note.email
    const password=note.password
        const response=await fetch("http://localhost:5000/api/auth/loginuser",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',              
            },
            body: JSON.stringify({email,password}),
          });
        const json=await response.json();
        console.log(json.success);
        if(json.success)
        {
          localStorage.setItem('token',json.authtoken)
          navigate("/");
          window.location.reload();

        }
        else
        {
          console.log("invalid cred")
        }

    }
    const [otp,setOtp]=useState()
  const handleOtp= async(e)=>{
    e.preventDefault();
    console.log("otp",otp)
const response=await fetch("http://localhost:5000/api/auth/verifyotp",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',              
            },
            body: JSON.stringify({otp}),
          });
        const json=await response.json();
        console.log(json)
        if(json.result)
        {
          navigate("/");
          window.location.reload();
        }
        else
        {
         alert("invalid otp")
        }

    }
    const handleOtpChange=(e)=>{
      setOtp(e)
    }
  const handleup=(e)=>{
      setup({...up,   [e.target.name]:e.target.value})
    }
    const submitup= async(e)=>{
      e.preventDefault();
      const name=up.name
      const about=up.about
      const email=up.email
      const password=up.password
      const profileImg=up.profileImg
      const bannerImg=up.bannerImg
      console.log(up);
          const response=await fetch("http://localhost:5000/api/auth/createuser",{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name,email,about,password,profileImg,bannerImg}),
            });
            setShowOtp(true);
          const json=await response.json();
          console.log(json.success);
          if(json.success)
          {
            //redirect
            console.log(json);
            localStorage.setItem('token',json.authtoken)
            // navigate("/");
            // window.location.reload();
        }
          else
          {
            alert("invalid cred")
          }

      }

 
   
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  return (
    
    <div>
<div className="Card8Share" onClick={handleOpen}>
<div className='hoverEffects' data-bs-toggle="modal" data-bs-target="#exampleModal"  >
<button style={{"display":"inline-block","width":"100%"}}> Join now</button>
</div>          </div>      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{"display":"flex","gap":"0.5rem","height":"90%","width":"80%","borderRadius":"1rem","boxShadow": "0 0 1px 1px hsla(0, 0%, 100%, 0.5 )"
}}>

        <MDBContainer className="d-flex flex-column" style={{"overflow":"auto"}}>

<MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
<MDBTabsItem>
    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
    Login
    </MDBTabsLink>
</MDBTabsItem>
<MDBTabsItem>
    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
    Register
    </MDBTabsLink>
</MDBTabsItem>
</MDBTabs>

<MDBTabsContent style={{"overflow":"auto"}}>

{justifyActive==="tab1"&&<MDBTabsPane show={justifyActive === 'tab1'} style={{"display":"flex","flexDirection":"column","gap":"0.7rem"}}>

    {/* <div className="text-center mb-3">
    <p>Sign in with:</p>

    <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='facebook-f' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='twitter' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='google' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='github' size="sm"/>
        </MDBBtn>
    </div>

    <p className="text-center mt-3">or:</p>
    </div> */}
       <input  className='SearchBox' label='Email address' id='form1' name='email' type='email' onChange={handlechange} placeholder="Email"/>
       <input  className='SearchBox' label='Password' id='form2' type='password' name='password' onChange={handlechange}placeholder="Password"/>

    <div className="d-flex justify-content-between mx-4 mb-4" style={{"alignItems":"center"}} >
    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
    <a href="!#" style={{"fontSize":"0.6rem"}}>Forgot password?</a>
    </div>
    <div data-dismiss="Modal" onClick={handlesubmit}>

    <ButtonComp title="Sign in" />
    </div>
    {/* <MDBBtn className="mb-4 w-100" data-dismiss="Modal" onClick={handlesubmit}>Sign in</MDBBtn> */}
   

</MDBTabsPane>}



{justifyActive==="tab2"&&<MDBTabsPane show={justifyActive === 'tab2'} style={{"display":"flex","flexDirection":"column","gap":"0.7rem","overflow":"auto","justifyContent":"center","justifyContent":"center"}}>

  
{showOtp===false&&<><input  className='SearchBox' label='Name' id='form1' name='name' type='text' onChange={handleup} placeholder="Name"/>
<textarea name='about' style={{"height":"10rem"}} onChange={handleup} placeholder="Add about" className='FormField'>
</textarea>
<input  className='SearchBox' label='Email' id='form1' name='email' type='email' onChange={handleup} placeholder="Email"/>
<input  className='SearchBox' label='Password' id='form1' name='password' type='password'onChange={handleup} placeholder="Password"/>
<input  className='SearchBox' label='profileImg' id='form1' name='profileImg' type='text'onChange={handleup} placeholder="Profile image"/>
<input  className='SearchBox' label='bannerImg' id='form1' name='bannerImg' type='text'onChange={handleup} placeholder="Banner image"/>
   
    <div data-dismiss="Modal" onClick={submitup} style={{"display":"flex","width":"5rem","alignItems":"center","justifyContent":"center"}}>
<ButtonComp title="Sign up" />

</div>
</>}
 {showOtp&&
 <div className="okOtp">
  Otp has been sent to {up.email}
  <ReactCodeInput onChange={handleOtpChange}/>
  <div style={{"display":"flex","width":"5rem","alignItems":"center","justifyContent":"center"}} onClick={handleOtp}>
    <ButtonComp title="Enter"/>
  </div>
</div>
}
    {/* <ButtonComp title="Sign Up" data-dismiss="Modal" /> */}
    {/* <MDBBtn className="mb-4 w-100" data-dismiss="Modal" onClick={submitup}>Sign up</MDBBtn> */}

</MDBTabsPane>}

</MDBTabsContent>

</MDBContainer>

        </Box>
      </Modal>
    </div>
  );
}