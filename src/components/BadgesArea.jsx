import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TopDonorsCard from './TopDonorsCard'
import TopTrendingCard from './TopTrendingCard'
import Badges from './Badges'
import { useParams } from 'react-router-dom'

function TopDonors() {
  
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
  return (
    <div className='BadgesArea' >
        <div className="TopTrendingTitle">
            Badges : 
        </div>
        <div className="Ok" style={{"display":"flex","justifyContent":"space-around","padding":"1rem","alignItems":"center"}}>
        {user&&user.amountDonated>1000&&<Badges select="gold"/>}
        {user&&user.amountDonated>500&&<Badges select="silver"/>}
        </div>
        
      
    </div>
  )
}

export default TopDonors