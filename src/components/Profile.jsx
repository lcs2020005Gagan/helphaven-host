import React, { useEffect, useState } from 'react'
import { BsCalendarEvent, BsFlag } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import HomePageCard from './HomePageCard';
import LikedCards from './LikedCards';
import RightNavBar from './RightNavBar';
import PublishedRequests from './PublishedRequests';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function Profile(toRender) {

    var rand=0
    const params=useParams()
    const {profileId} =useParams();
   
    const host="http://localhost:5000"
    const [user,setUser]=useState(null)
    const [showRatings,setShowRatings]=useState(true)
    const [creditScore,setCreditScore]=useState(-1)
    const [dv,setDv]=useState(0)
    const [pv,setPv]=useState(0)
    var flag=false
    useEffect(() => {
      
        const func=async()=>
          { 
        const response=await fetch(`${host}/api/auth/getuserwithid/${params.profileId}`,{
          method: 'GET',
            });
          const json=await response.json();
          if(json.amountDonated===0&&json.postedComments.length===0)
          setShowRatings(false)
          setUser(json)
          setCreditScore(100+(json.amountDonated/100)-json.hateComments.length)
          if(creditScore>100)
          setCreditScore(100)
          setDv(creditScore/20)
          if(creditScore!==-1)flag=true;
        }
        if(params.profileId!=="self")
            func();
            console.log(user)  
      },[])
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
              if(json[0].amountDonated===0&&json[0].postedComments.length===0)
              setShowRatings(false)             
              setUser(json[0])   
             setCreditScore(100+(json[0].amountDonated/100)-json[0].hateComments.length)
              if(creditScore>100)
              setCreditScore(100)
              setDv(creditScore/20)
              if(dv>5){
                setDv(5)
              }
              console.log("dv",dv)
              if(creditScore!==-1)flag=true;


            }
            if(params.profileId==="self"&&localStorage.getItem('token'))
            {
                getUserProfile();
                console.log(user)  

            }
      },[])
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    
   

  return (
    <>
    {user&&<div className='ProfileJs' >
        <div className="ProfileJsBanner">
            <img src={user.bannerImg} alt="image" />
        </div>
       
        {<div className='ProfileJsProfilePic'>
            <img src={user.profileImg} />
        </div>}
                <div style={{"position":"relative","width":"100%"}}>
 
                {showRatings&&<ThemeProvider theme={darkTheme}>

<div className="RatingsProfile">
  <span>Social Credits : </span>
<Rating name="half-rating-read" defaultValue={(100-user.hateComments.length+(user.amountDonated/100))/20} precision={0.1} readOnly style={{"fontSize":"1.5rem"}}/>
</div>
</ThemeProvider>}
                </div>
        {<div className='ProfileJsProfileInfo'>
            <div className="ProfileJsProfileInfoBio">
                <div className="ProfileJsProfileInfoBioTop">
                <h5>{user.name}</h5>
                <MdModeEditOutline className='MdModeEditOutline'/>
                {/* <BsFillPersonPlusFill className='MdModeEditOutline'/> */}
                </div>
            <p>{user.about}</p>
            </div>
            <div className='ProfileJsProfileInfoDetails' style={{"display":"flex","gap":"0.3rem","alignItems":"end"}}>
               <div style={{"fontSize":"1.2rem"}}>
               <BsCalendarEvent/> 
                </div>
                Joined on 25th November
               

            </div>
           

            <div style={{"display":"flex","gap":"0.8rem"}}>

                 <p style={{"color":"white","fontSize":"0.8rem"}}>
                {user.followers.length} followers  
                </p>
                 <p style={{"color":"white","fontSize":"0.8rem"}}>
                {user.following.length} following  
                </p>
                </div>

        </div>}
        <div className='ProfileJsTabsProfile' style={{"backgroundColor":"black"}} >
          <div className="RightAndLeft">
            <div className="ok" style={{"display":"grid","width":"100%","gridTemplateColumns":"1fr 1fr"}}>

            <div className={`${toRender.toRender==="subscriptions"?"UlListActive":""} ProfileJsTabsLi `}>

            <Link to={`/profile/${profileId}`} style={{"textDecoration":"none"}}>
            <li >
                Published Requests
            </li>
            </Link>
            </div>
            <div className={`${toRender.toRender==="liked"?"UlListActive":""} ProfileJsTabsLi`}>
            <Link to={`/profile/${profileId}/liked`} style={{"textDecoration":"none"}}>
            <li >
                Liked
            </li>
            </Link>

            </div>
            </div>
        


        <div className='ProfileJsUnderTabs'>
        {toRender.toRender==="subscriptions"&&<div className='ProfileJsUnderTabsCon'>
                    <PublishedRequests PublishedRequests={user.cardId} urlIs="profile"/>
            </div>}

           

            {toRender.toRender==="liked"&&<div className='ProfileJsUnderTabsCon'>
            <LikedCards PublishedRequests={user.likedCards} urlIs="profile"/>

          </div>}
            
        </div>

          </div>
        <RightNavBar location="profile" followers={user.followers} following={user.following}/>
          </div>

    </div>}
    </>
  )
}

export default Profile

