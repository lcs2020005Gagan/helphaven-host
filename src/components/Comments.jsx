import CommentCard from './CommentCard'
import {BsFilterLeft} from 'react-icons/bs'
import * as React from 'react';
import {useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router-dom';
import FailureAlert from './FailureAlert';
import axios from 'axios';

function Comments(props)  {
     
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
          console.log(json)
         setUser(json[0])    
        }
            getUserProfile();

  },[])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
   var rand=0
   const {storyId}  = useParams();

    const [negativeSentiment,setNegativeSentiment]=useState(false)
   const [note, setnote] = useState({ comment:""});
   const handlechange = (e) => {
       setnote({ ...note, [e.target.name]: e.target.value })
      //  console.log(note);
   }

   const [commentsUseState,setCommentsUseState]=useState(props.comments)
   
   const updateUserHateComments=async(hateCommentId)=>{
    console.log("hatred",hateCommentId)
    const response = await fetch(`http://localhost:5000/api/auth/hatecomment/${hateCommentId}`, {
      method: 'POST',
      headers: {
          'auth-token':(localStorage.getItem('token')),
          'Content-Type': 'application/json',
      }
      });
  const json = await response.json();
  console.log("after adding hate",json);
}
   const handlesubmit = async (e) => {
       // console.log("hello")
       setNegativeSentiment(false)
       e.preventDefault();
       const comment = note.comment
       const authtoken=localStorage.getItem('token');
       const response = await fetch(`http://localhost:5000/api/upload/addcomment/${storyId}`, {
           method: 'POST',
           headers: {
               'auth-token':(localStorage.getItem('token')),
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ comment}),
       });
       const json = await response.json();
       console.log(json);
       if (json.success==="success") {
          axios.post('http://localhost:8000/api/post-data', {
            data: comment
          })
          .then(response => {
            setNegativeSentiment(!response.data)
            console.log("sentiment",negativeSentiment);
        
          })
          .catch(error => {
            console.log(error);
          });
          setCommentsUseState([json.card[0],...commentsUseState])
          const hm=document.getElementsByClassName('CommentField')[0]
          hm.value=""
          if(negativeSentiment){
            updateUserHateComments(json.card[0]._id)
          }
        }
       else {
           console.log("invalid cred")
       }
   } 
  return (
    <div className='CommentsJs'>
      {negativeSentiment&&<FailureAlert heading = "Warning:" message = "We have detected a negative/hatred comment from you. If you think otherwise, report it to us for review. " setNegativeSentiment={setNegativeSentiment}/>}
        <div className="CommentsJsHeader">
            <div className="CommentsJsNumber">
            {commentsUseState.length} comments
            </div>
            
            <div className="CommentsJsFilter">
            <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <span> <BsFilterLeft/></span> Sort by
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Newest comments</MenuItem>
        <MenuItem onClick={handleClose}>Top comments</MenuItem>
      </Menu>
            </div>
        </div>
        <div className="CommentInput">
            <div className="CommentJsCardAuthorImg">
                <img src={user&&user.profileImg} alt="" />
            </div>
                                    <textarea name='comment'  placeholder="Add your comment" 
                                    onChange={handlechange}
                                    className='CommentField'>
                                    </textarea>
        </div>
        <div className="CommentInputSb" onClick={handlesubmit}>
            Submit
        </div>
        {commentsUseState&&commentsUseState.map((element) => {
    return <div key={rand++} style={{"padding":"0","margin":"0","width":"100%"}}>
       <CommentCard element={element}/>
    </div>
})}
    </div>
  )
}

export default Comments