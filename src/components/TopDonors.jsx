import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TopDonorsCard from './TopDonorsCard'
import TopTrendingCard from './TopTrendingCard'

function TopDonors() {
  var rand=0
 
  const host="http://localhost:5000"
  const [user,setUser]=useState(null)
  useEffect(() => {
    
      const func=async()=>
        { 
      const response=await fetch(`${host}/api/auth/gettopdonors`,{
        method: 'GET',
          });
        const json=await response.json();
        json.sort((a, b) => {
          return b.donationsGiven.length - a.donationsGiven.length;
      });
        setUser(json)
      }
          func();
    },[])
  return (
    <div className='TopDonors'>
        <div className="TopTrendingTitle">
            Top Donors
        </div>
        {user&&user.map((element) => {
    return <div key={rand} style={{"padding":"0","margin":"0","width":"100%"}}>
       <TopDonorsCard element={element} />
    </div>
})}
        
      
    </div>
  )
}

export default TopDonors