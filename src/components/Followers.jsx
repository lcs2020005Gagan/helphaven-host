import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import NoContent from './NoContent'
import TopDonorsCard from './TopDonorsCard'
import TopTrendingCard from './TopTrendingCard'

function Followers(props) {
    var rand=0
    useEffect(() => {
     console.log(props)
    }, [])
    
  return (
    <div className='TopDonors'>
        <div className="TopTrendingTitle">
{props.title}
        </div>
     {props.title==="Followers"&&props.followers&&props.followers.map((element) => {
    return <div key={rand} style={{"padding":"0","margin":"0","width":"100%"}}>
       <TopDonorsCard element={element} rank={++rand}/>
    </div>
})}
     {props.title==="Followers"&&props.followers.length===0&&<div style={{"color":"white","textAlign":"center","paddingBottom":"0.5rem"}}>
        <img src="" alt="" />
        <h6>0 followers</h6>
    </div>
}

     {props.title==="Following"&&props.following&&props.following.map((element) => {
    return <div key={rand} style={{"padding":"0","margin":"0","width":"100%"}}>
       <TopDonorsCard element={element} rank={++rand} location="profile"/>
    </div>
})}
 {props.title==="Following"&&props.following.length===0&&<div style={{"color":"white","textAlign":"center","paddingBottom":"0.5rem"}}>
        <img src="" alt="" />
        <h6>0 following</h6>
    </div>
}
    </div>
  )
}

export default Followers