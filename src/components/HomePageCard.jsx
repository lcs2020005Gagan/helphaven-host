import React, { useEffect, useState } from 'react'
import {MdOutlineMail} from 'react-icons/md';
import {BiUpvote} from 'react-icons/bi'
import {BsBookmarkPlus,BsBookmarkCheckFill} from 'react-icons/bs'
import {FiMessageSquare} from 'react-icons/fi'
import {AiOutlineShareAlt,AiOutlineEye} from 'react-icons/ai'
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import VisibilitySensor from "react-visibility-sensor";
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Chip from './Chip'
import Chip2 from './Chip2';
function HomePageCard(props) {
  // useEffect(() => {
  // console.log("inside homepage", props)
  // }, [])
  var rand=0
    const [bookmarkedCards,setBookmarkedCards]=useState(props.bookmarks)
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate(`/story/${props.element?._id}`)
    }
    const handleUpvote= async(e)=>{
            console.log("going in")
            const card_id=props.element?._id
            const response=await fetch("http://localhost:5000/api/upload/upvote",{
                method: 'POST',
                headers: {
                  'auth-token':localStorage.getItem('token'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({card_id}),
              });
            const json=await response.json();
            console.log(json.success);
            if(json.success)
            {
              //redirect
              console.log("success ")
    
            }
            else
            {
              console.log("invalid cred")
            }
    
        }
    const handleBookmark= async(e)=>{
            console.log("going in")
            const card_id=props.element?._id
            const response=await fetch("http://localhost:5000/api/upload/bookmark",{
                method: 'POST',
                headers: {
                  'auth-token':localStorage.getItem('token'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({card_id}),
              });
            const json=await response.json();
            console.log(json.success);
            if(json.success)
            {
              //redirect
              console.log("success mf")
              setBookmarkedCards([...bookmarkedCards,props.element?._id]);
            }
            else
            {
              console.log("invalid cred")
            }
    
        }
  return (
  <div className="whole-card">

      {props&&<div className="whole-card-effect">
      <div className="whole-card-views">
        {props.element?.views} views
      </div>
       
             <div className="card-container">
        <div className="left">
            <div>
            <img src={props.element?.image} alt="" />
            </div>
            

        </div>
        <div className="right">
            <h3 className='textClip-2'>
                {props.element?.title}
            </h3>
            <Link to={`/profile/${props.element?.author._id}`}>

            <div className="card-author">
                <img src={props.element?.author?.profileImg} alt="" />
                {props.element?.author?.name}
            </div>
            </Link>
            <hr />
            <div className="right-content textClip-5">
             {props.element?.description}
            </div>

        </div>
    </div>
    <div className="ChipContainerHomePageCard">
      {
        props.element?.tags.map((element) => {
          return        <Chip2  key={rand++} chip={element}/>
          })
      }

    </div>    
    <div className='bottom-container'>
      <div className="percentage">
      <VisibilitySensor>
            {({ isVisible }) => {
              const percentage = isVisible ? 90 : 0;
              return (
                <CircularProgressbar
                styles={buildStyles({
                  textColor: 'white',
                  trailColor: 'black',
                  pathColor:'aqua',
                  backgroundColor: '#b1f9b7',
                })}
              
              value={Math.min(100,Math.round(props.element.amountDonated/props.element.amountRequired*100))} text={`${Math.min(100,Math.round(props.element.amountDonated/props.element.amountRequired*100))}%`} />
              );
            }}
          </VisibilitySensor>
     
      </div>
  

                <div className="icons">
                    <Tooltip title="Upvote">
                    <BiUpvote onClick={handleUpvote}/>
                    </Tooltip>
                   {bookmarkedCards?.includes(props.element?._id)?<BsBookmarkCheckFill className='DarkGreen' onClick={handleBookmark}/>:<BsBookmarkPlus onClick={handleBookmark}/>}
                    <AiOutlineShareAlt/>
                    <AiOutlineEye onClick={handleClick}/>
                </div>
        </div>
    </div>
   }

    </div>
  )
}

export default HomePageCard