import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import NavBar from './NavBar'
import NoContent from './NoContent'
import PublishedRequests from './PublishedRequests'
import RightNavBar from './RightNavBar'

function BookMarks() {
    var rand=0
  
   
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
             //  console.log("side",json);
             setUser(json[0])    
            }
         
                getUserProfile();
                // console.log(user)  

      },[])

  return (
    <div className='ProfileJs'>
      
        {user&&user.bookmarkedCards.length?<div className="RightAndLeft">
        <NavBar title={"Bookmarks"}/>
        <PublishedRequests PublishedRequests={user.bookmarkedCards}/>
        </div>:<NoContent NoContentTitle={"No Bookmarks Found"} NoContentMessage={"The posts you bookmark will appear here"}/>}
        {/* <RightNavBar/> */}


    </div>
  )
}

export default BookMarks