import React, { useEffect, useState } from 'react'
import {BsDot} from 'react-icons/bs'
import {FaRegThumbsUp,FaRegThumbsDown,FaThumbsDown,FaThumbsUp} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import axios from 'axios';

function CommentCard(props) {
     

const [likes, setlikes] = useState(0) 
const [reveal, setReveal] = useState(true) 
const [liked, setliked] = useState("") 

function getOrdinalSuffix(date) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = date % 10;
  return (date > 10 && date < 20) ? suffixes[0] : suffixes[lastDigit] || suffixes[0];
}

function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

function formatTime(date) {
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${hour}:${minute}:${second}`;
}
const getProperDate=(inputDate)=>{
  const date = new Date(inputDate);
  const formattedDate = `${date.getDate()}${getOrdinalSuffix(date.getDate())} ${getMonthName(date.getMonth())}, ${date.getFullYear()}`;
  
  return formattedDate;
}




useEffect(() => {
    // console.log("hello")
    
      setReveal(true)
       axios.post('http://localhost:8000/api/post-data', {
         data: props.element.comment
       })
       .then(response => {
         setReveal(response.data)
        //  console.log("reveal?"+props.element.comment,reveal);
       })
       .catch(error => {
         console.log(error);
       });

       
    
}, [])



   const handleLiked=()=>{
    if(liked==="l")
    {
      setliked("");
      setlikes(likes-1);
    }
    else if(liked==="")
    {
      setliked("l");
      setlikes(likes+1);
    }
    else
    {
      setliked("l")
      setlikes(likes+2);
    }
    }
    const handledDisliked=()=>{
      if(liked==="d")
      {
        setliked("");
        setlikes(likes+1);
      }
      else if(liked==="")
      {
        setliked("d");
        setlikes(likes-1);
      }
      else
      {
        setliked("d")
        setlikes(likes-2);
      }
    }
    const handleReveal=()=>{
      setReveal(true)
    }
  return (
    <>
    {props.element&&<div className='CommentCardPar'>{<div className={`CommentCard ${!reveal?"BlurContent":""}`}>
        <div className="CommentCardAuthorImg">
            <img src={props.element.author.profileImg} alt="" />
        </div>
        <div className="CommentCardContent">
            <div className="CommentCardHeader">
                    <Link to={`/profile/${props.element.author._id}`}> <h2>@{props.element.author.name}</h2></Link> {getProperDate(props.element.date)}
            </div>
            <div className="CommentCardMiddle">
               {props.element.comment}
            </div>
            <div className="CommentCardFooter">
            <div className="Card3InfoLike">
              <div className="Likes hoverEffects" style={{"color":"white","fontSize":"1rem"}}>
              {liked==="l"&&<FaThumbsUp onClick={()=>handleLiked()} />}{liked!=="l"&&<FaRegThumbsUp onClick={()=>handleLiked()}/>}
               </div>
               {likes}
               <div className="Dislikes hoverEffects" style={{"color":"white","fontSize":"1rem"}}>

               {liked==="d"&&<FaThumbsDown onClick={()=>handledDisliked()}/>}{liked!=="d"&&<FaRegThumbsDown onClick={()=>handledDisliked()}/>}
               </div>
            </div>
            </div>
        </div>
    </div>}
    {!reveal&&<div className='Discretion'>
    This comment is categorized as <span style={{"color":"crimson"}}>harmful/spam</span> content by our ML MODEL. Click show to view.
<div className="Reveal" onClick={handleReveal}>Show</div>
    </div>}
    </div>
    }
    </>
  )
}

export default CommentCard