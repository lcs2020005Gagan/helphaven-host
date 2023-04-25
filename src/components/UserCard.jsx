import React, { useEffect, useState } from 'react'
import {BsDot} from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'
import { useParams,Link } from 'react-router-dom'

function UserCard(props) {
  var rand=0
  const params=useParams()
    const {profileId} =useParams();
  const host="http://localhost:5000"
  const [card,setCard]=useState(null)
  useEffect(() => {
      const func=async()=>
        { 
      const response=await fetch(`${host}/api/upload/getcardwithid/${props.element}`,{
        method: 'GET',
          });
        const json=await response.json();
        setCard(json)
      }
          func();
    },[])
    const handleDelete=()=>{
      const updateUser=async(user)=>{
        const updatedarray=[]
        for(let i=0;i<user.cardId.length;i++)
        {
          if(props.element!==user.cardId[i])
          updatedarray.push(user.cardId[i]);
        }
        const cardId=updatedarray
        const response=await fetch(`${host}/api/auth/updateusercardid`,{
          method: 'POST',
          headers: {
              'auth-token': localStorage.getItem('token'),
              'Content-Type':'application/json'
            },
            body: JSON.stringify({cardId}),

        });
      }
      const deleteFromuser=async()=>{
              const response=await fetch(`${host}/api/auth/getuser`,{
                  method: 'GET',
                  headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type':'application/json'
                  },
                });
                const json=await response.json();
             
               updateUser(json[0]);
              }

      const deleteNote=async  ()=>{
        const id=props.element;
        const response=await fetch(`${host}/api/upload/deletecard/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
         const json=response.json();
         deleteFromuser();
         window.location.reload()
          // const newNote=notes.filter((note)=>{
          //     return note._id!==id
          // })
          // setNotes(newNote);
      }
      deleteNote();
    }
 
  
  return (
    <>
   { card&&<div className='UserCard'>
            <div className="UserCardTop">
              <Link to={`/profile/${card.author._id}`}>
                <div className="UserCardAuthor">
                    <img src={card.author.profileImg} alt="" />
                    {card.author.name}
                </div>
              </Link>
                <div className="UserCardClose">
                <IoMdClose onClick={handleDelete}/>
                </div>
            </div>
            <div className="UserCardMiddle">
              <div className="UserCardMiddleLeft">

                <div className="UserCardTitle textClip-2">
                    {card.title}
                </div>
                <div className="UserCardDescription textClip-3" style={{"fontSize":"1rem"}}>
                    {card.description}
                </div>
              </div>
              <div className="UserCardMiddleRight">
                <img src={card.image} alt="" />
              </div>
            </div>
            <div className="UserCardBottom">
                <div className="UserCardBottomLeft">
                    <div className="UserCardTag">
                        {card.tags[0]}
                    </div>
                </div>
                <div className="UserCardBottomRight">

                </div>
            </div>
            
    </div>}
    </>
  )
}

export default UserCard