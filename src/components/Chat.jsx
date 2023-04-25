import React from 'react'
import DontWantToChat from './DontWantToChat'
import Button from '@mui/material/Button';
import ButtonComp from './ButtonComp';
import io from "socket.io-client"; 
import RightNavBarForChat from './RightNavBarForChat'
import { useEffect, useState, useRef } from 'react';

const Chat = () => {
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

  },[])
  // const currentUserName = user.name;
  // const currentUserId= user.id;
  const [rname,setRname]=useState("Search user to begin chatting")

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(''); 
  const socket = io.connect('http://localhost:5000');
  const [receiver,setReceiver]=useState(user?._id);
  
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("receivedata",(chat)=>{
    console.log("hi");
   
   console.log(chat.messages)
    var mes = chat.messages.map(function(num) {
      
      const mess= {sender:num.sender,text:num.text}
      return  mess
      });
      mes=mes.filter(item => {
        // Modify this condition to filter items based on your requirement
        // For example, to filter items whose name contains a specific string
        return !(item.sender===undefined)
      });
  setMessages(mes);
   })
  socket.on("getReceiverName",(r)=>{
    console.log(r)
    if(r.sender===null)
    setRname("SEARCH FOR SOMEONE TO CHAT WITH")
    else
    setRname(r)})

    socket.on("message",(s,sname,receivers,newMessage)=>{
      // if(receiver==receivers||sender==currentUser)
     if(s==user?._id)
     {
      {  const p={text:newMessage,  sender: sname};
      console.log("yessssss")
      setMessages([...messages,p]);
      console.log(messages);
      }
    }
     })
  
  useEffect(() => {
 //joining
    socket.emit('join',user?._id, receiver);
 socket.emit("getReceiverName",receiver)
 
    console.log(receiver," changed backend ie receiver changed")

 //receiving message
 
   
  },[receiver]);

     
 

  

  const sendMessage = (e) => {
   // console.log("clicked");
   //console.log('user is', user?.name)
    //const s={text:newMessage,  sender:user?.name};
    //console.log(e);
   
   // setMessages([...messages, s]);
    console.log(messages);
    // console.log(newMessage); 
    e.preventDefault();
    socket.emit('message',  user?._id, user?.name,  receiver, newMessage);
    setNewMessage(""); 
    
    //  if (newMessage.trim() !== '') {
    //   socket.emit('message', { chatId, sender: currentUser._id, text: newMessage }); 
    
  };
  const whiteStyles = {
    color: 'white'
  }

  return (

    <div className='RightAndLeft2'>
<div >
  <div>
      <h2 className="chat-heading"> {rname} </h2>
     <div className='chat-window'>
        {messages.map((message) => (
            
          <div  style={whiteStyles} className={`ChatList ${user.name===message.sender?"message-right":"message-left"} `}>
            <font size="4"
            face="arial"
            color="#ffffff">
              <div className={`MessageText ${user.name===message.sender?"message-text-right":"message-text-left"} `}>

            {message.text}
              </div>
            </font>
          </div>

        ))}
      </div>
      
        <input type="text"  className="chat-textarea" 
      placeholder="Type your message here" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      
        <button className="publish-button1" onClick={sendMessage}><ButtonComp title="Send"/></button>            
      </div>
     
    </div>
    <RightNavBarForChat receiver={receiver} setReceiver={setReceiver}/>
  </div>
  );
};

export default Chat;