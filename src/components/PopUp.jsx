import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaShareAlt } from 'react-icons/fa'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { TagsInput } from 'react-tag-input-component'

import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { FiLogIn } from 'react-icons/fi'
import ButtonComp from './ButtonComp';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'hsla(0, 0%, 2%, 0.8)',
    boxShadow: 24,
    p: 4,
    fontFamily: '"Cascadia Code",Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace',
    
};


export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selected, setSelected] = useState([]);

    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    const [tags, setTags] = React.useState(['']);
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    const navigate = useNavigate();
    const [note, setnote] = useState({ title: "", briefDescription: "",description:"" ,image:""});
    const handlechange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
        // console.log(note);
    }

    const handlesubmit = async (e) => {
        // console.log("hello")
        e.preventDefault();
        const title = note.title
        const briefDescription = note.briefDescription
        const description = note.description
        const image = note.image
        const authtoken=localStorage.getItem('token');
        console.log(typeof(authtoken));
        const tags = selected;
        console.log(title, briefDescription, description, tags, authtoken);
        const response = await fetch("http://localhost:5000/api/upload/addcard", {
            method: 'POST',
            headers: {
                'auth-token':(localStorage.getItem('token')),
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({ title, briefDescription ,description,tags,image}),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            console.log("success mf")
            // navigate('/home');
            // handleClose();
            window.location.reload();

        }
        else {
            console.log("invalid cred")
        }
    }  


    return (

        <>
            <div className="pushlish-request" onClick={handleOpen}>

                <ButtonComp title="Publish Request" />

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} style={{
                    "display": "flex", "gap": "1rem", "height": "95%", "width": "60%", "borderRadius": "1rem", "padding": "1rem","overflow":"auto", "boxShadow": "0 0 1px 1px hsla(0, 0%, 100%, 0.5 )"

                }}>

                    <MDBContainer className="d-flex flex-column">

                        <MDBTabsContent>

                            <MDBTabsPane show={justifyActive === 'tab1'} style={{"display":"flex","flexDirection":"column","gap":"0.8rem"}}>

                                <div className="close-icon">
                                    <CloseIcon onClick={handleClose} />
                                </div>

                                <input type="text" className='SearchBox' placeholder='Title' label='Title' id='form1' name='title' onChange={handlechange}/>
                                {/* <MDBInput wrapperClass='mb-4' label='Title' id='form1' name='title' type='text' onChange={handlechange} /> */}
                                <input type="text" className='SearchBox' placeholder='Brief Description' label='Brief Description' id='form1' name='briefDescription'  onChange={handlechange}/>
                                <input type="text" className='SearchBox' placeholder='Image' label='image' id='form1' name='image'  onChange={handlechange}/>
                                <div className="Description">
                                    <textarea name='description' style={{"height":"10rem"}} onChange={handlechange} placeholder="Add description" className='FormField'>
                                    </textarea>
                                </div>
                                <div className="tags">
                                <TagsInput
                                    value={selected}
                                    onChange={setSelected}
                                    name="tags"
                                    placeHolder="Add relevant tags" className='FormField'
                                    style={{"backgroundColor":"red"}}
                                />
                               
                                </div>
                                <div className="publish-button" onClick={handlesubmit} >
                                <ButtonComp title="Publish"/>
                                </div>
                                
                            </MDBTabsPane>

                        </MDBTabsContent>

                    </MDBContainer>
                   
                </Box>
                
            </Modal>
           
        </>
    );
}


