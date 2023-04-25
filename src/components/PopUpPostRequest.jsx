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
    bgcolor: '#f3f3f3',
    boxShadow: 24,
    p: 4,
    fontFamily: '"Cascadia Code",Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace',
};

function PopUpPostRequest() {
  return (
    <div>
        <Box sx={style} style={{
                    "display": "flex", "gap": "0.5rem", "height": "95%", "width": "60%", "borderRadius": "1rem", "padding": "3rem","overflow":"auto"
                }}>

                    <MDBContainer className="d-flex flex-column">

                        <MDBTabsContent>

                            <MDBTabsPane >

                                {/* <div className="close-icon">
                                    <CloseIcon onClick={handleClose} />
                                </div> */}


                                <MDBInput wrapperClass='mb-4' label='Title' id='form1' name='title' type='text' />
                                <MDBInput wrapperClass='mb-4' label='Brief Description' id='form1' name='briefDescription' type='text'  />
                                <div className="Description" style={{ "marginBottom": "2rem" }}>
                                    <textarea name='description' style={{ "height": "6rem", "width": "100%", "border": "0.1px solid  rgb(219, 214, 214)", "borderRadius": "3px" }} >
                                    </textarea>
                                    Description
                                </div>
                                {/* <div className="tags">
                                <TagsInput
                                    value={selected}
                                    onChange={setSelected}
                                    name="tags"
                                    placeHolder="add relevant tags"
                                />
                                <p style={{"marginTop":"0.8rem"}}>
                                Tags
                                </p>
                                </div> */}
                                <div className="publish-button" >
                                    <ButtonComp title={"Publish"}/>
                                   </div>
                                
                            </MDBTabsPane>

                        </MDBTabsContent>

                    </MDBContainer>
                   
                </Box>
    </div>
  )
}

export default PopUpPostRequest