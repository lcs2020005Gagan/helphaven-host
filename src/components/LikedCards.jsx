import React from 'react'
import { useEffect } from 'react'
import UserCard from './UserCard'

function PublishedRequests(props) {
    var rand=0

    
  return (
    <div className={`${props.urlIs==="profile"?"PublishedRequests2":"PublishedRequests"}`}>
        {props.PublishedRequests&&props.PublishedRequests. map((element) => {
    return <div key={rand++} style={{"padding":"0","margin":"0","width":"100%"}}>
       <UserCard element={element}/>
    </div>
})}
    </div>
  )

}

export default PublishedRequests