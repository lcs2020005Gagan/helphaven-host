import React, { useEffect, useState } from 'react'
import ButtonComp from './ButtonComp'
import { Link, useParams } from 'react-router-dom'
import CommentCard from './CommentCard'
import Comments from './Comments'
import Chip from './Chip'

function Story() {
    var rand=0
    const params=useParams()
    const {storyId} =useParams();
   
    const host="http://localhost:5000"
    const [card,setCard]=useState(null)
    useEffect(() => {
        const func=async()=>
          { 
        const response=await fetch(`${host}/api/upload/getcardwithid/${params.storyId}`,{
          method: 'GET',
            });
          const json=await response.json();
          setCard(json)
          const views=json.views+1
          const id=storyId
          
    const response2=await fetch(`${host}/api/upload/updatecardviews`,{
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type':'application/json'
              },
              body: JSON.stringify({views,id}),
          });
          const json2 = await response2.json();
          console.log(json2);
        }
        func();

      },[])
    return (
        <>
        {card&&<div className="story-container">
            <div className="story-image-and-title">
                <div className="story-image">
                    <img src={card.image} alt="" />
                </div>
                <div className="story-title">
                    <h1>
                        {card.title}
                    </h1>
                    <h5>
                        {card.briefDescription}
                    </h5>
                </div>
            </div>
            <div className="author-and-donation">
                <div className="author-name">
                <Link to={`/profile/${card.author._id}`}>
                <div className="card-author">
                <img src={card.author.profileImg} alt="" />
                {card.author.name}
            </div>
                    </Link>
                    <br />
                    {new Date(card.date).toUTCString().substring(0,16)}
                </div>
                <Link to={`/creditcard?title=${card.title}&image=${card.image}&cardId=${card._id}&authname=${card.author.name}&authprofile=${card.author.profileImg}`} className="donate-btn" >
                    <ButtonComp className="donate-btn" title={"Donate Money"} />
                </Link>
                <Link to={`/metamask?title=${card.title}&image=${card.image}&cardId=${card._id}&authname=${card.author.name}&authprofile=${card.author.profileImg}`} className="donate-btn" >
                    <ButtonComp className="donate-btn" title={"Donate Crypto"} />
                </Link>
                <div className="donation-count">
                    <span>Amount Donated : </span>₹ {Math.round(card?.amountDonated)} 
                    <br />
                    <span>Donation Goal : </span>₹ {card?.amountRequired}
                </div>
            </div>
            <div className="full-details">
              {card.description}
            </div>
            <div className="ChipContainer">
          {  card.tags.map((element) => {
    return        <Chip  key={rand++} chip={element}/>
    })}

            </div>
            <Comments comments={card.commentsSection} author={card.author}/>
        </div>}
        </>
    )
}

export default Story