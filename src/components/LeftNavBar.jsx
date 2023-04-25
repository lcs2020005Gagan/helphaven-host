import React, { useState, useEffect } from 'react'
import {BiHomeCircle} from 'react-icons/bi'
import {MdTravelExplore,MdExplore,MdOutlineMessage,MdMessage} from 'react-icons/md'
import {BsPerson,BsBookmarks,BsFillPersonFill,BsBookmarksFill} from 'react-icons/bs'
import {FiMessageSquare} from 'react-icons/fi'
import {FaHands} from 'react-icons/fa'
import {BsTwitter} from 'react-icons/bs'
import {AiOutlineHome,AiTwotoneHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineExplore} from 'react-icons/md'
import ButtonComp from './ButtonComp'
import PopUp from './PopUp'
import PopUpDetails from './PopUpDetails'
import LeftPersistentDrawer from './LeftPersistentDrawer'

import { Link, useParams ,useLocation, useNavigate} from 'react-router-dom';
import PopUpPostRequest from './PopUpPostRequest'

function LeftNavBar() {
    
    let location=useLocation();
    var rand=0
    const params=useParams()
    const {profileId} =useParams();
   const navigate=useNavigate()
    const host="http://localhost:5000"
    const [user,setUser]=useState(null)

      useEffect(()=>{
      
        const getUserProfile=async ()=>{
            const response=await fetch(`${host}/api/auth/getuser`,{
                method: 'GET',
                headers: {
                  'auth-token': localStorage.getItem('token'),
                  'Content-Type':'application/json'
                },
              });
        
              const json=await response.json();
           
              console.log("side",json);
             setUser(json[0])    
            }
                getUserProfile();

      },[])
    const func=(str)=>{
        let res="/"
        for(let i=1;i<str.length;i++)
        {if(str[i]=='/')return res;
        res+=str[i]}
    }
    const handleLogOut=()=>{
      localStorage.clear();
      window.location.reload()
    }

    

  return (
    <div className='LeftNavBar'>
      {/* <LeftPersistentDrawer/> */}
      {user&&user.defaultValuesAdded===false&&<PopUpDetails
       defaultState="true"/>}
        <div className="HelpHavenLogo">
            {/* <BsTwitter/> */}
            <FaHands/>
        </div>
        <div className='Profile'>
                    <div className='ProfileImgDiv'>
                        <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <defs>
                                <pattern style={{"boxShadow":"10px 10px 10px 10px #7498bf"}}id="img" patternUnits="userSpaceOnUse" width="100" height="100">
                                   {user&& <image href={user.profileImg} width="150" height="100" />}
                                </pattern>
                            </defs>
                                <polygon id="profilePic" className='hoverEffects' points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img)" />
                        </svg>
                    </div>
                    {user&&user.name}
                </div>
        <ul className='LeftNavBarUl TextBig'>
            <Link to="/">
            <li className={`LeftNavBarLi ${location.pathname==="/"?"LeftNavActive":""}`}>{location.pathname!=="/"&&<AiOutlineHome/>} {location.pathname==="/"&&<AiTwotoneHome/>} Home</li>
            </Link>
            <Link to="/explore/foru">
            <li className={`LeftNavBarLi ${func(location.pathname)==="/explore"?"LeftNavActive":""}`}>{func(location.pathname)!=="/explore"&&<MdOutlineExplore/>} {func(location.pathname)==="/explore"&&<MdExplore/>} Explore</li>
            </Link>
            {localStorage.getItem("token")&&<Link to="/chat">
         <li className={`LeftNavBarLi ${func(location.pathname)==="/chat"?"LeftNavActive":""}`}>{func(location.pathname)!=="/chat"&&<MdOutlineMessage/>} {func(location.pathname)==="/chat"&&<MdMessage/>} Messages</li>
            </Link>}
            {/* <li className='LeftNavBarLi'><FiMessageSquare/> Messages</li> */}
            {localStorage.getItem("token")&& <Link to="/bookmarks">
             <li className={`LeftNavBarLi ${location.pathname==="/bookmarks"?"LeftNavActive":""}`}>{location.pathname!=="/bookmarks"&&<BsBookmarks/>} {location.pathname==="/bookmarks"&&<BsBookmarksFill/>} Bookmarks</li>
            </Link>}
            {localStorage.getItem("token")&&  <Link to="/profile/self">
            <li className={`LeftNavBarLi ${func(location.pathname)==="/profile"?"LeftNavActive":""}`}>{func(location.pathname)!=="/profile"&&<BsPerson/>} {func(location.pathname)==="/profile"&&<BsFillPersonFill/>} Profile</li>
            </Link>}
            <div onClick={handleLogOut}>
              {!localStorage.getItem("token")?<a href="/home">
            <li className={`LeftNavBarLi`}><FiLogOut/> LogIn</li>
              </a>:<li className={`LeftNavBarLi`} onClick={handleLogOut}><FiLogOut/> Logout</li>
}
            </div>
            <div >
            <a href="/home">
            <li className={`LeftNavBarLi`}><BsInfoCircle/> About</li>
              </a>

            </div>
            {localStorage.getItem("token")&&<PopUp/>}
        </ul>
    </div>
  )
}

export default LeftNavBar