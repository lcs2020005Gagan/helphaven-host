import React, { useState } from 'react'
import { useEffect } from 'react'
import {BsFillPersonPlusFill,BsFillPersonDashFill,BsPersonCheckFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function TopDonorsCard(props) {
  const host="http://localhost:5000"
  const [user,setUser]=useState(null)
  const params=useParams()
  const {profileId} =useParams();
  const [followingButton,setFollowingButton]=useState(false)
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
          if(json[0].following.some(obj => obj._id === props.element._id))
          {
            setFollowingButton(true)
          }
          
         setUser(json[0])   
        }
        if(localStorage.getItem('token'))
        {
            getUserProfile();
        }
  },[])
  const handleUnfollow=async()=>{
    setFollowingButton(false)
    const response=await fetch(`${host}/api/auth/deletefriend/${props.element._id}`,{
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type':'application/json'
      },
    });
    const json=await response.json();
    console.log(json)
    setUser(json.user)
  }
  const handleFollow=async()=>{
    setFollowingButton(true)
    const response=await fetch(`${host}/api/auth/addfriend/${props.element._id}`,{
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type':'application/json'
      },

    });
    const json=await response.json();
    console.log(json)
    setUser(json.user)
  }

  return (
    <>
    {props&&<div className={`TopDonorsCard ${(props.rank%2)===1?"AlternatingBg":""}`} >
        <div className="TopDonorsCardProfile">
      <Link to={`/profile/${props.element._id}`} style={{"display":"flex","color":"white","gap":"0.5rem"}}>
            <img src={props.element.profileImg} alt="" className='ImgImg' />
            <div className="TopDonorsCardContent">
            <div className="TopDonorsCardName">
                {props.element.name}
            </div>
            <div className="TopDonorsCardDonations">
                {props.element.donationsGiven.length} Donations
            </div>
        </div>
        </Link>
        </div>
        <div className="TopDonorsCardFollow">
        {user&&profileId==="self"&&user._id===props.element._id?<div className='YouButton'>(You)</div>:followingButton?<div onClick={handleUnfollow} className='FollowingButton' >Following <BsPersonCheckFill/></div>:<div className='FollowButton' onClick={handleFollow}>Follow <BsFillPersonPlusFill/></div>
        }
        </div>
    </div>}
    </>
  )
}

export default TopDonorsCard