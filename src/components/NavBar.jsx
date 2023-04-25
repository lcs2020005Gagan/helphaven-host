import React from 'react'
import {BiHomeCircle} from 'react-icons/bi'
import {Link } from 'react-router-dom'
import Drawer from "./Drawer"
function NavBar(props) {
  return (
    <>
    <div className='NavBar'>
      <div className="hm" style={{"display":"flex"}}>
          <div className="ok" style={{"marginLeft":"auto"}}>

          {props.title} 
          </div>
          <div className="upper-left-icon-draw" style={{"marginLeft":"auto"}}>
         { (props.title=="Home"||props.title==="Bookmarks")&&<Drawer/>}

          </div>
      </div>
      {props.title==="Explore"&& <div className='ProfileJsTabs' >
            <div className={`${props.toRender==="ForYou"?"UlListActive":""} ProfileJsTabsLi`}>
            <Link to={`/explore/foru`} style={{"textDecoration":"none"}}>
            <li >
                For You
            </li>
            </Link>
            </div>
            <div className={`${props.toRender==="Trending"?"UlListActive":""} ProfileJsTabsLi`}>
            <Link to={`/explore/trending`} style={{"textDecoration":"none"}}>
            <li >
                Most Viewed
            </li>
            </Link>
            </div>
        </div>
          }
    </div>
  
    </>
  )
}

export default NavBar